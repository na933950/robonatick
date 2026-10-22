export interface Team {
  number: string
  name: string
  level: string
  description?: string
  logoUrl?: string
  teamUrl?: string
  contactEmail?: string
}

export interface ProgramEvent {
  title: string
  date: string
  location?: string
  description?: string
  url?: string
}

export interface SupportEntry {
  name: string
  kind: 'grant' | 'sponsor' | 'other'
  status: 'current' | 'past'
  description?: string
  url?: string
}

export interface OutreachActivity {
  name: string
  description: string
  status: 'reported' | 'planned'
}

export interface Mentor {
  name: string
  role: string
  bio?: string
  email?: string
}

export interface SiteConfig {
  programEmail: string
  newsletterSignupUrl: string
  ftcUrl: string
}

export interface SiteContent {
  site: SiteConfig
  teams: Team[]
  events: ProgramEvent[]
  support: SupportEntry[]
  outreach: OutreachActivity[]
  mentors: Mentor[]
}

export interface FeedUrls {
  teams?: string
  events?: string
  support?: string
  outreach?: string
  mentors?: string
  site?: string
}

export interface LoadedContent {
  content: SiteContent
  warnings: string[]
}
