import { useEffect, useState } from 'react'
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  ExternalLink,
  HeartHandshake,
  Mail,
  Menu,
  X,
} from 'lucide-react'
import headerLogo from '../assets/teams/RoboNatick header.png'
import teamBanner from '../assets/teams/RoboNatick banner with teams.png'
import teamPhoto from '../assets/teams/team_photo.jpeg'
import newsletterQr from '../assets/newsletter/RoboNatick Newsletter QR Code.png'
import newsletterFlyer from '../assets/newsletter/Robotics Mailing List Sign Up Updated.pdf'
import { loadSiteContent, feedUrls } from './data/content'
import { seedContent } from './data/seed'
import type { SiteContent } from './data/types'

const navigation = [
  { label: 'Home', href: '#home' },
  { label: 'About us', href: '#about' },
  { label: 'Teams', href: '#teams' },
  { label: 'Get involved', href: '#involved' },
  { label: 'Contact', href: '#contact' },
]

const hasConfiguredFeeds = Object.values(feedUrls).some(Boolean)

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a
          className="brand"
          href="#home"
          aria-label="RoboNatick home"
          onClick={() => setMenuOpen(false)}
        >
          <img src={headerLogo} alt="RoboNatick" />
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
        <nav
          className={`primary-nav${menuOpen ? ' primary-nav-open' : ''}`}
          id="primary-navigation"
          aria-label="Primary navigation"
        >
          {navigation.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </a>
          ))}
          <a className="nav-cta" href="#involved" onClick={() => setMenuOpen(false)}>
            Join the effort <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </nav>
      </div>
    </header>
  )
}

function SectionLabel({ children }: { children: string }) {
  return <p className="section-label">{children}</p>
}

function TeamSection({ content }: { content: SiteContent }) {
  return (
    <section className="section teams-section" id="teams" aria-labelledby="teams-title">
      <div className="container">
        <div className="section-heading-row">
          <div>
            <SectionLabel>One program, three paths</SectionLabel>
            <h2 id="teams-title">Find your team.</h2>
          </div>
          <p className="section-intro">
            From first-year builders to seasoned competitors, students grow their skills and
            make something real together.
          </p>
        </div>
        <div className="team-list">
          {content.teams.map((team, index) => (
            <article className="team-row" key={team.number}>
              <div className="team-number" aria-label={`Team ${team.number}`}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{team.number}</strong>
              </div>
              <div className="team-detail">
                <p className="team-level">{team.level} · FIRST Tech Challenge</p>
                <h3>{team.name}</h3>
                <p>
                  {team.description ||
                    'A Natick High robotics team building skills through design, engineering, and competition.'}
                </p>
              </div>
              <div className="team-action">
                {team.logoUrl && <img className="team-logo" src={team.logoUrl} alt="" />}
                {team.teamUrl ? (
                  <a
                    className="round-link"
                    href={team.teamUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Visit ${team.name} team link`}
                  >
                    <ArrowUpRight aria-hidden="true" />
                  </a>
                ) : (
                  <a
                    className="round-link"
                    href={`mailto:${team.contactEmail || content.site.programEmail}?subject=${encodeURIComponent(`Team ${team.number} inquiry`)}`}
                    aria-label={`Ask about ${team.name}`}
                  >
                    <ArrowUpRight aria-hidden="true" />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
        {content.teams.length === 0 && (
          <p className="empty-note">Team profiles have not been published yet.</p>
        )}
        <div className="team-banner-wrap">
          <img
            className="team-banner"
            src={teamBanner}
            alt="RoboNatick with team numbers 3737, 5436, and 6032"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  )
}

function Events({ content }: { content: SiteContent }) {
  if (content.events.length === 0) {
    return (
      <p className="empty-note">
        <CalendarDays size={18} aria-hidden="true" />
        No upcoming events have been published yet.
      </p>
    )
  }

  return (
    <ul className="event-list">
      {content.events.map((event) => (
        <li key={`${event.title}-${event.date}`}>
          <div className="event-date">{formatDate(event.date)}</div>
          <div className="event-copy">
            <h3>{event.title}</h3>
            {event.description && <p>{event.description}</p>}
            {event.location && <span>{event.location}</span>}
          </div>
          {event.url && (
            <a
              className="text-link"
              href={event.url}
              target="_blank"
              rel="noreferrer"
              aria-label={`More about ${event.title}`}
            >
              Details <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          )}
        </li>
      ))}
    </ul>
  )
}

function formatDate(date: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00Z`))
}

function SupportList({ content }: { content: SiteContent }) {
  const currentSupport = content.support.filter((entry) => entry.status === 'current')
  const pastSupport = content.support.filter((entry) => entry.status === 'past')
  return (
    <div className="support-content">
      {currentSupport.length > 0 && (
        <div className="support-group">
          <h3>Current supporters</h3>
          <ul className="support-list">
            {currentSupport.map((entry) => (
              <li key={`${entry.name}-${entry.kind}`}>
                {entry.url ? (
                  <a href={entry.url} target="_blank" rel="noreferrer">
                    {entry.name} <ExternalLink size={14} aria-hidden="true" />
                  </a>
                ) : (
                  entry.name
                )}
                {entry.description && <span>{entry.description}</span>}
              </li>
            ))}
          </ul>
        </div>
      )}
      {pastSupport.length > 0 && (
        <div className="support-group">
          <h3>Past grant and community support</h3>
          <ul className="support-list">
            {pastSupport.map((entry) => (
              <li key={`${entry.name}-${entry.kind}`}>
                {entry.url ? (
                  <a href={entry.url} target="_blank" rel="noreferrer">
                    {entry.name} <ExternalLink size={14} aria-hidden="true" />
                  </a>
                ) : (
                  entry.name
                )}
                {entry.description && <span>{entry.description}</span>}
              </li>
            ))}
          </ul>
          <p className="support-caveat">
            Thank you to the organizations that have supported RoboNatick. Past support is not a
            statement of current sponsorship.
          </p>
        </div>
      )}
      {pastSupport.length === 0 && currentSupport.length === 0 && (
        <p className="empty-note">Supporter information has not been published yet.</p>
      )}
    </div>
  )
}

function ContactSection({ content }: { content: SiteContent }) {
  return (
    <section className="section contact-section" id="contact" aria-labelledby="contact-title">
      <div className="container contact-grid">
        <div className="contact-copy">
          <SectionLabel>Let’s make something matter</SectionLabel>
          <h2 id="contact-title">There’s a place for you here.</h2>
          <p>
            Curious about the program, interested in mentoring, or looking for ways to support
            student robotics? We’d love to hear from you.
          </p>
          <a className="contact-email" href={`mailto:${content.site.programEmail}`}>
            <Mail size={19} aria-hidden="true" />
            {content.site.programEmail}
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
        <aside className="newsletter-card" aria-labelledby="newsletter-title">
          <div className="newsletter-copy">
            <SectionLabel>Stay in the loop</SectionLabel>
            <h3 id="newsletter-title">A little robotics in your inbox.</h3>
            <p>Get occasional updates on how our teams are doing throughout the season.</p>
            <a
              className="text-link"
              href={content.site.newsletterSignupUrl}
              target="_blank"
              rel="noreferrer"
            >
              Sign up for the newsletter <ArrowUpRight size={15} aria-hidden="true" />
            </a>
            <a className="flyer-link" href={newsletterFlyer} target="_blank" rel="noreferrer">
              View the original signup flyer
            </a>
          </div>
          <a
            className="qr-link"
            href={content.site.newsletterSignupUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Open the RoboNatick newsletter signup form"
          >
            <img src={newsletterQr} alt="QR code for the RoboNatick newsletter signup form" />
          </a>
        </aside>
      </div>
    </section>
  )
}

function App() {
  const [content, setContent] = useState(seedContent)
  const [warnings, setWarnings] = useState<string[]>([])
  const [loading, setLoading] = useState(hasConfiguredFeeds)

  useEffect(() => {
    if (!hasConfiguredFeeds) return
    let active = true

    loadSiteContent()
      .then((result) => {
        if (!active) return
        setContent(result.content)
        setWarnings(result.warnings)
        setLoading(false)
      })
      .catch((error: unknown) => {
        if (!active) return
        const detail = error instanceof Error ? error.message : 'Unknown data error.'
        setWarnings([
          `Published content could not be updated (${detail}); local content is shown.`,
        ])
        setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  const pastOutreach = content.outreach.filter((activity) => activity.status === 'reported')
  const plannedOutreach = content.outreach.filter((activity) => activity.status === 'planned')

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <main id="main-content">
        {(loading || warnings.length > 0) && (
          <div
            className={`feed-notice${warnings.length > 0 ? ' feed-notice-warning' : ''}`}
            role="status"
          >
            {loading ? (
              <>
                <span className="loading-dot" aria-hidden="true" />
                Checking published program updates…
              </>
            ) : (
              <>
                <span aria-hidden="true">i</span>
                <div>
                  {warnings.map((warning) => (
                    <p key={warning}>{warning}</p>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        <section className="hero" id="home" aria-labelledby="hero-title">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">
                <span className="eyebrow-mark" aria-hidden="true" />
                Natick High School · Robotics
              </p>
              <h1 id="hero-title" aria-label="Build what moves you.">
                Build what
                <br />
                <span>moves you.</span>
              </h1>
              <p className="hero-description">
                Three student teams. One shared pursuit. A community that turns curiosity into
                robots, confidence, and possibility.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#teams">
                  Meet the teams <ArrowDownRight size={17} aria-hidden="true" />
                </a>
                <a className="text-link" href="#about">
                  Get to know us <ArrowDown size={15} aria-hidden="true" />
                </a>
              </div>
              <div className="hero-mark">
                <span>FIRST</span>
                <span>TECH CHALLENGE</span>
                <span className="hero-mark-rule" />
                <span>STUDENT-LED. COMMUNITY-POWERED.</span>
              </div>
            </div>
            <figure className="hero-photo">
              <img
                src={teamPhoto}
                alt="RoboNatick students collaborate around a robot in their workshop"
                fetchPriority="high"
              />
              <figcaption>
                <span>Ideas take shape here.</span>
                <span>Natick, Massachusetts</span>
              </figcaption>
              <div className="photo-index" aria-hidden="true">
                RN
                <br />/ 01
              </div>
            </figure>
          </div>
          <a className="scroll-cue" href="#about" aria-label="Scroll to About RoboNatick">
            <span>Scroll to explore</span>
            <ArrowDown size={16} aria-hidden="true" />
          </a>
        </section>

        <section className="intro-section" id="about" aria-labelledby="about-title">
          <div className="container intro-grid">
            <div className="intro-heading">
              <SectionLabel>Curiosity, with a toolkit</SectionLabel>
              <h2 id="about-title">
                More than robots.
                <br />
                <span>A way to learn.</span>
              </h2>
            </div>
            <div className="intro-copy">
              <p>
                RoboNatick is the home of competitive robotics at Natick High School. Students
                imagine, design, build, and program robots for the{' '}
                <a href={content.site.ftcUrl} target="_blank" rel="noreferrer">
                  FIRST Tech Challenge <ExternalLink size={14} aria-hidden="true" />
                </a>
                —and learn to solve hard problems as a team along the way.
              </p>
              <p>
                Three teams share tools, know-how, and a passion for engineering. Each season
                brings a new challenge and another chance to make something together.
              </p>
              <a
                className="text-link"
                href={content.site.ftcUrl}
                target="_blank"
                rel="noreferrer"
              >
                Explore FIRST Tech Challenge <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </div>
            <div className="intro-foot">
              <span>MADE IN NATICK</span>
              <span>LEARN TOGETHER · BUILD WHAT’S NEXT</span>
            </div>
          </div>
        </section>

        <TeamSection content={content} />

        <section className="community-section" aria-labelledby="community-title">
          <div className="container community-grid">
            <div className="community-heading">
              <SectionLabel>Learning goes both ways</SectionLabel>
              <h2 id="community-title">
                Better builders
                <br />
                <span>build community.</span>
              </h2>
              <p>
                Sharing what we learn is part of the work. RoboNatick students bring STEM into
                the wider Natick community—and bring new ideas back to the workshop.
              </p>
              <a className="community-link" href="#involved">
                Find a way to pitch in <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
            <div className="community-story">
              <img
                src={`${import.meta.env.BASE_URL}images/teams-at-mathworks.png`}
                alt="RoboNatick students and robots outside a MathWorks building"
                loading="lazy"
              />
              <div className="story-caption">
                <span>People, ideas, and engineering meet.</span>
                <span>01 — OUT IN THE COMMUNITY</span>
              </div>
            </div>
            <div className="activity-list">
              {pastOutreach.map((activity, index) => (
                <article className="activity-item" key={activity.name}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{activity.name}</h3>
                    <p>{activity.description}</p>
                  </div>
                  <Check size={16} aria-hidden="true" />
                </article>
              ))}
              {plannedOutreach.map((activity, index) => (
                <article className="activity-item activity-planned" key={activity.name}>
                  <span>{String(pastOutreach.length + index + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{activity.name}</h3>
                    <p>{activity.description}</p>
                  </div>
                  <span className="planned-tag">Planned</span>
                </article>
              ))}
              {content.outreach.length === 0 && (
                <p className="activity-empty">
                  Outreach updates will appear here when they are ready to share.
                </p>
              )}
            </div>
          </div>
        </section>

        <section
          className="section involved-section"
          id="involved"
          aria-labelledby="involved-title"
        >
          <div className="container">
            <div className="section-heading-row involved-heading">
              <div>
                <SectionLabel>Many ways to move forward</SectionLabel>
                <h2 id="involved-title">Help make it happen.</h2>
              </div>
              <p className="section-intro">
                Time, expertise, and support help students take an idea from the workbench to
                the competition floor.
              </p>
            </div>
            <div className="involved-grid">
              <div className="involved-panel sponsor-panel">
                <div className="panel-topline">
                  <HeartHandshake size={21} aria-hidden="true" />
                  <span>Good work is a team effort</span>
                </div>
                <h3>Support the next idea.</h3>
                <p>
                  Local organizations, mentors, and community members make hands-on learning
                  possible. Talk with us about sponsorship, grants, fundraising, mentoring, or
                  sharing your expertise as a guest speaker.
                </p>
                <SupportList content={content} />
                {content.mentors.length > 0 && (
                  <div className="mentor-list">
                    <h3>Program mentors</h3>
                    {content.mentors.map((mentor) => (
                      <div key={`${mentor.name}-${mentor.role}`}>
                        <strong>{mentor.name}</strong>
                        <span>{mentor.role}</span>
                        {mentor.bio && <p>{mentor.bio}</p>}
                        {mentor.email && <a href={`mailto:${mentor.email}`}>{mentor.email}</a>}
                      </div>
                    ))}
                  </div>
                )}
                <a className="panel-link" href={`mailto:${content.site.programEmail}`}>
                  Start a conversation <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </div>
              <div className="involved-panel events-panel">
                <div className="panel-topline">
                  <CalendarDays size={20} aria-hidden="true" />
                  <span>On the calendar</span>
                </div>
                <h3>Meet us along the way.</h3>
                <p>Only confirmed, published future dates appear here.</p>
                <Events content={content} />
                <div className="event-photo">
                  <img
                    src={`${import.meta.env.BASE_URL}images/qualifier-team.png`}
                    alt="RoboNatick students with their robot at a competition"
                    loading="lazy"
                  />
                  <span>Curiosity, put to the test.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ContactSection content={content} />
      </main>
      <footer className="site-footer">
        <div className="container footer-main">
          <a className="footer-brand" href="#home" aria-label="RoboNatick, back to top">
            <img src={headerLogo} alt="" />
            <span>Natick High School · Natick, MA</span>
          </a>
          <nav aria-label="Footer navigation" className="footer-nav">
            {navigation.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <a className="footer-mail" href={`mailto:${content.site.programEmail}`}>
            Say hello <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>
        <div className="container footer-bottom">
          <span>RoboNatick · Student robotics at Natick High</span>
          <span>LEARN · BUILD · SHARE</span>
        </div>
      </footer>
    </>
  )
}

export default App
