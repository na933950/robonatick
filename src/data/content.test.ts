import { afterEach, describe, expect, it, vi } from 'vitest'
import { loadSiteContent } from './content'
import { seedContent } from './seed'

afterEach(() => {
  vi.unstubAllGlobals()
})

function stubFeed(csv: string, status = 200) {
  const fetchMock = vi.fn(async () => new Response(csv, { status }))
  vi.stubGlobal('fetch', fetchMock)
  return fetchMock
}

describe('loadSiteContent', () => {
  it('keeps seed content when feeds are not configured', async () => {
    const result = await loadSiteContent({}, '2026-10-21')
    expect(result.content.teams).toEqual(seedContent.teams)
    expect(result.content.site.newsletterSignupUrl).toBe('https://forms.gle/cRVqiHK3hPo1Tb1LA')
    expect(result.warnings).toEqual([])
  })

  it('uses only published rows and excludes past or invalidly dated events', async () => {
    const url = 'https://example.test/events.csv'
    stubFeed(
      [
        'title,date,location,description,url,published',
        'Open house,2026-11-12,Natick High,See our robots,,TRUE',
        'Old fundraiser,2026-10-01,,,,true',
        'Bad date,2026-02-31,,,,true',
        'Draft,2026-12-01,,,,false',
      ].join('\n'),
    )

    const result = await loadSiteContent({ events: url }, '2026-10-21')
    expect(result.content.events).toEqual([
      {
        title: 'Open house',
        date: '2026-11-12',
        location: 'Natick High',
        description: 'See our robots',
        url: undefined,
      },
    ])
    expect(result.warnings).toEqual([
      'Events: Published row 4: date must be a real calendar date in YYYY-MM-DD format.',
    ])
  })

  it('shows seed content and an explicit warning when a feed fails', async () => {
    const url = 'https://example.test/teams.csv'
    stubFeed('', 503)

    const result = await loadSiteContent({ teams: url }, '2026-10-21')
    expect(result.content.teams).toEqual(seedContent.teams)
    expect(result.warnings).toEqual([
      'Teams feed could not be loaded (HTTP 503); local content is shown instead.',
    ])
  })

  it('overrides only published public site settings', async () => {
    const url = 'https://example.test/site.csv'
    stubFeed(
      'key,value,published\nprogram_email,robotics@example.org,true\nftc_url,https://example.org/ftc,false',
    )

    const result = await loadSiteContent({ site: url }, '2026-10-21')
    expect(result.content.site.programEmail).toBe('robotics@example.org')
    expect(result.content.site.ftcUrl).toBe(seedContent.site.ftcUrl)
  })

  it('does not expose a non-HTTP URL from a published team row', async () => {
    const url = 'https://example.test/teams.csv'
    stubFeed(
      'number,name,level,team_url,published\n3737,RedHawks,Varsity,javascript:alert(1),true',
    )

    const result = await loadSiteContent({ teams: url }, '2026-10-21')
    expect(result.content.teams).toEqual([])
    expect(result.warnings[0]).toContain('team_url must use HTTP or HTTPS.')
  })
})
