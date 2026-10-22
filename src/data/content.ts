import { optionalPublicUrl, readPublishedRecords } from './csv'
import { seedContent } from './seed'
import type {
  FeedUrls,
  LoadedContent,
  Mentor,
  OutreachActivity,
  ProgramEvent,
  SiteConfig,
  SiteContent,
  SupportEntry,
  Team,
} from './types'

const configuredNewsletterUrl = import.meta.env.VITE_NEWSLETTER_SIGNUP_URL?.trim()

export const feedUrls: FeedUrls = {
  teams: import.meta.env.VITE_SHEETS_TEAMS_CSV_URL?.trim(),
  events: import.meta.env.VITE_SHEETS_EVENTS_CSV_URL?.trim(),
  support: import.meta.env.VITE_SHEETS_SUPPORT_CSV_URL?.trim(),
  outreach: import.meta.env.VITE_SHEETS_OUTREACH_CSV_URL?.trim(),
  mentors: import.meta.env.VITE_SHEETS_MENTORS_CSV_URL?.trim(),
  site: import.meta.env.VITE_SHEETS_SITE_CSV_URL?.trim(),
}

const csvRequests = new Map<string, Promise<string>>()

function fetchCsv(url: string): Promise<string> {
  const cached = csvRequests.get(url)
  if (cached) return cached

  const request = fetch(url).then(async (response) => {
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    return response.text()
  })
  csvRequests.set(url, request)
  request.catch(() => csvRequests.delete(url))
  return request
}

function required(record: Record<string, string>, field: string): string {
  const value = record[field]?.trim()
  if (!value) throw new Error(`Missing required field "${field}".`)
  return value
}

function optionalEmail(value: string | undefined, field: string): string | undefined {
  const email = value?.trim()
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error(`${field} must be a valid public email address.`)
  }
  return email || undefined
}

function mapRows<T>(
  csv: string,
  mapRecord: (record: Record<string, string>) => T,
): { items: T[]; issues: string[] } {
  const { records, issues } = readPublishedRecords(csv)
  const items: T[] = []

  records.forEach((record, index) => {
    try {
      items.push(mapRecord(record))
    } catch (error) {
      const detail = error instanceof Error ? error.message : 'Invalid row.'
      issues.push(`Published row ${index + 2}: ${detail}`)
    }
  })
  return { items, issues }
}

function mapTeam(record: Record<string, string>): Team {
  const number = required(record, 'number')
  if (!/^\d+$/.test(number)) throw new Error('number must contain digits only.')
  return {
    number,
    name: required(record, 'name'),
    level: required(record, 'level'),
    description: record.description || undefined,
    logoUrl: optionalPublicUrl(record.logo_url, 'logo_url'),
    teamUrl: optionalPublicUrl(record.team_url, 'team_url'),
    contactEmail: optionalEmail(record.contact_email, 'contact_email'),
  }
}

function mapEvent(record: Record<string, string>, today: string): ProgramEvent | undefined {
  const title = required(record, 'title')
  const date = required(record, 'date')
  const parsedDate = new Date(`${date}T00:00:00Z`)
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
    Number.isNaN(parsedDate.getTime()) ||
    parsedDate.toISOString().slice(0, 10) !== date
  ) {
    throw new Error('date must be a real calendar date in YYYY-MM-DD format.')
  }
  if (date < today) return undefined
  return {
    title,
    date,
    location: record.location || undefined,
    description: record.description || undefined,
    url: optionalPublicUrl(record.url, 'url'),
  }
}

function mapSupport(record: Record<string, string>): SupportEntry {
  const kind = required(record, 'kind').toLowerCase()
  const status = required(record, 'status').toLowerCase()
  if (kind !== 'grant' && kind !== 'sponsor' && kind !== 'other') {
    throw new Error('kind must be grant, sponsor, or other.')
  }
  if (status !== 'current' && status !== 'past') {
    throw new Error('status must be current or past.')
  }
  return {
    name: required(record, 'name'),
    kind,
    status,
    description: record.description || undefined,
    url: optionalPublicUrl(record.url, 'url'),
  }
}

function mapOutreach(record: Record<string, string>): OutreachActivity {
  const status = required(record, 'status').toLowerCase()
  if (status !== 'reported' && status !== 'planned') {
    throw new Error('status must be reported or planned.')
  }
  return {
    name: required(record, 'name'),
    description: required(record, 'description'),
    status,
  }
}

function mapMentor(record: Record<string, string>): Mentor {
  return {
    name: required(record, 'name'),
    role: required(record, 'role'),
    bio: record.bio || undefined,
    email: optionalEmail(record.email, 'email'),
  }
}

function mapEvents(csv: string, today: string): { items: ProgramEvent[]; issues: string[] } {
  const result = mapRows(csv, (record) => mapEvent(record, today))
  return {
    items: result.items.filter((event): event is ProgramEvent => event !== undefined),
    issues: result.issues,
  }
}

function mapSiteConfig(csv: string, base: SiteConfig): { site: SiteConfig; issues: string[] } {
  const { records, issues } = readPublishedRecords(csv)
  const site = { ...base }

  records.forEach((record, index) => {
    try {
      const key = required(record, 'key').toLowerCase()
      const value = required(record, 'value')
      if (key === 'program_email') {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          throw new Error('program_email must be a valid email address.')
        }
        site.programEmail = value
      } else if (key === 'newsletter_signup_url') {
        site.newsletterSignupUrl =
          optionalPublicUrl(value, 'newsletter_signup_url') ?? site.newsletterSignupUrl
      } else if (key === 'ftc_url') {
        site.ftcUrl = optionalPublicUrl(value, 'ftc_url') ?? site.ftcUrl
      } else {
        throw new Error(`Unknown site key "${key}".`)
      }
    } catch (error) {
      const detail = error instanceof Error ? error.message : 'Invalid row.'
      issues.push(`Published row ${index + 2}: ${detail}`)
    }
  })

  return { site, issues }
}

async function loadFeed<T>(
  label: string,
  url: string | undefined,
  fallback: T[],
  map: (csv: string) => { items: T[]; issues: string[] },
  warnings: string[],
): Promise<T[]> {
  if (!url) return fallback
  try {
    const result = map(await fetchCsv(url))
    warnings.push(...result.issues.map((issue) => `${label}: ${issue}`))
    return result.items
  } catch (error) {
    const detail = error instanceof Error ? error.message : 'Unknown feed error.'
    warnings.push(
      `${label} feed could not be loaded (${detail}); local content is shown instead.`,
    )
    return fallback
  }
}

export async function loadSiteContent(
  urls: FeedUrls = feedUrls,
  today = new Date().toISOString().slice(0, 10),
): Promise<LoadedContent> {
  const warnings: string[] = []
  const fallback: SiteContent = {
    ...seedContent,
    site: {
      ...seedContent.site,
      ...(configuredNewsletterUrl ? { newsletterSignupUrl: configuredNewsletterUrl } : {}),
    },
  }

  const [teams, events, support, outreach, mentors] = await Promise.all([
    loadFeed('Teams', urls.teams, fallback.teams, (csv) => mapRows(csv, mapTeam), warnings),
    loadFeed('Events', urls.events, fallback.events, (csv) => mapEvents(csv, today), warnings),
    loadFeed(
      'Support',
      urls.support,
      fallback.support,
      (csv) => mapRows(csv, mapSupport),
      warnings,
    ),
    loadFeed(
      'Outreach',
      urls.outreach,
      fallback.outreach,
      (csv) => mapRows(csv, mapOutreach),
      warnings,
    ),
    loadFeed(
      'Mentors',
      urls.mentors,
      fallback.mentors,
      (csv) => mapRows(csv, mapMentor),
      warnings,
    ),
  ])

  let site = fallback.site
  if (urls.site) {
    try {
      const result = mapSiteConfig(await fetchCsv(urls.site), site)
      site = result.site
      warnings.push(...result.issues.map((issue) => `Site: ${issue}`))
    } catch (error) {
      const detail = error instanceof Error ? error.message : 'Unknown feed error.'
      warnings.push(
        `Site feed could not be loaded (${detail}); local configuration is shown instead.`,
      )
    }
  }

  return { content: { site, teams, events, support, outreach, mentors }, warnings }
}
