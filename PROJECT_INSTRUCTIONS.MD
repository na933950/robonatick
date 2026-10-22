# Project: Build the RoboNatick robotics program website

Act as a senior frontend engineer, UI/UX designer, and technical lead. Implement a polished, production-quality informational website for RoboNatick, the Natick High School robotics program in Natick, Massachusetts.

I have a background in React, Vite, TypeScript, and frontend development. Do not explain basic concepts to me. Make sound engineering decisions, implement the application in the current workspace, verify your work, and summarize meaningful decisions.

The workspace folder is already named `robonatick`. It is the project root and has already had Git initialized. Do not create a nested application folder or reinitialize Git.

## 1. Inspect the workspace first

Before making changes:

- Inspect the existing files and folder structure.
- Read `PROJECT_BRIEF.md` if it exists.
- Inspect the contents of `assets/`, including image dimensions and formats when possible.
- Identify which supplied images are newsletter artwork, QR codes, team photos, logos, or other assets. Do not infer an image's purpose solely from its filename if its contents suggest otherwise. You may rename files for your convenience or set up purposes if needed
- Preserve supplied assets and existing work. Never delete or overwrite existing user content without approval.
- If the workspace contains only the initial brief and assets, scaffold the application directly in the current directory.
- Do not run destructive cleanup commands or replace the existing directory.

The supplied project brief and the requirements in this prompt are the primary content sources. If they conflict, use the more specific or more recent information and flag unresolved conflicts.

## 2. Technology stack

Use:

- React
- TypeScript with strict type checking
- Vite
- npm and a committed `package-lock.json`
- Tailwind CSS with its current recommended Vite integration
- `lucide-react` for icons
- ESLint for static analysis
- Prettier for formatting

Use compatible stable dependency versions and current official documentation. Avoid outdated Tailwind configuration patterns.

Use React Router only if separate page routes genuinely improve the site's information architecture. Do not introduce a backend, database server, authentication framework, global state library, or CMS.

The application should build into static files and remain compatible with standard static hosting. Do not choose or configure a hosting provider yet.

## 3. Product goals and audiences

RoboNatick is a shared robotics program encompassing three student teams.

The website should:

- Introduce the overall program and its mission.
- Make all three teams easy to discover.
- Showcase robotics, engineering, student collaboration, and competition.
- Explain outreach and community involvement.
- Help visitors understand how to support the program through sponsorship, fundraising, mentoring, and guest speaking.
- Provide clear contact information and a working newsletter signup link.
- Be maintainable by future contributors who may not know React.

The audiences include prospective participants, families, students, school staff, mentors, sponsors, donors, and community members.

Prioritize clarity, credibility, accessibility, and genuine program identity over unnecessary visual effects.

## 4. Visual direction

Use Natick High School's red, blue, and white colors as the starting point for the visual identity.

Create a distinctive, modern robotics website with:

- A strong visual hierarchy and intentional typography.
- A confident hero section with compelling imagery, concise copy, and a clear primary action.
- Restrained use of the program's school colors.
- Strong readable contrast and a consistent spacing system.
- Engineering-inspired visual details where they add meaning.
- Carefully composed layouts, varied section treatments, and thoughtful responsive behavior.
- A cohesive navigation, footer, and set of reusable components.
- Subtle animation only where it improves the experience.

Avoid generic startup landing-page design, repetitive card grids, gratuitous gradients, excessive glassmorphism, distracting animation, and meaningless technical decoration.

Use genuine assets from the workspace. Do not invent or fabricate team logos, student identities, competition results, robot photographs, or sponsor logos.

If a real asset is unavailable, build a layout that accommodates it later. Use neutral placeholders or intentional text-based treatments, not misleading imagery.

## 5. Site structure

Use these five primary navigation sections:

1. Home
2. About Us
3. Teams
4. Get Involved
5. Contact

Organize related information within these pages rather than making every topic a top-level navigation item.

### Home

Create a visually compelling introduction to RoboNatick with:

- Program identity and mission.
- Prominent entry points to the three teams.
- Genuine robotics or team imagery where available.
- A short introduction to the program.
- Outreach and community impact.
- Relevant upcoming events when data is available.
- Calls to action for getting involved and signing up for the newsletter.

### About Us

Describe the RoboNatick program, its mission, collaborative culture, outreach, and relationship to FIRST Tech Challenge.

Provide a clear external link to the official FIRST Tech Challenge website and relevant official event resources.

Include coaches and mentors here or in an appropriate dedicated subsection. Do not invent biographies.

### Teams

Support these three teams:

- Team 3737 — RedHawks (varsity)
- Team 5436 — Cyber Hawks (JV)
- Team 6032 — Lightning Hawks (freshman)

Provide a distinct profile for each team. Each profile should accommodate its name, number, description, level, logo, team photos, leadership, and team-specific contact or competition links when available.

Keep the shared program identity consistent while giving each team room for its own branding.

Use data-driven rendering so that team details are easy to update. Do not hardcode separate copies of the same layout for each team.

### Get Involved

Include relevant sections for:

- Sponsors and grants.
- Donations and sponsorship opportunities.
- Fundraising events.
- Mentoring and guest-speaker opportunities.
- Outreach and community involvement.
- Ways local organizations can support the program.

Distinguish current sponsors from historical grant recipients and past sources of funding. Do not claim an organization currently sponsors the program unless the information confirms that status.

Provide working external links when supplied. Do not invent donation destinations or imply that a nonexistent form works.

### Contact

Include:

- The main RoboNatick contact email: `robonatickredhawks@gmail.com`.
- Team-specific contact information when supplied.
- A newsletter signup link and the provided flyer or QR code as appropriate.

Inspect the supplied newsletter assets. Preserve the QR code exactly; do not redraw, crop, distort, or regenerate it. Ensure it remains large and clear enough to scan.

Use the supplied newsletter form URL if available. If it is not available, provide an obvious configuration placeholder and document what needs to be supplied.

Do not create a fake signup form or claim a submission succeeded when no real submission mechanism exists.

## 6. Seed content and factual accuracy

Use the following supplied information as initial seed content. You should begin by reading the entire existing robonatick site. Do not use this as a design baseline in any way, but a source of information for a revised version of the site: https://sites.google.com/natickps.org/robonatick/home. You may be able to source more photos from this site.

### Outreach

Known activities include:

- STEM volunteering at the senior center.
- Design reviews with MathWorks.
- A booth at Natick Days.
- Plans to present at both middle schools.

The team has also participated in other activities in past years. Do not represent discontinued activities as current commitments.

### Grants and support

Previously received grants include MathWorks, Gene Haas Foundation, and Natick Educational Foundation. Natick Cultural Council and Home Depot were mentioned as past sources of support.

Represent historical support accurately. Use an appropriate label such as "Past grant support" when current sponsorship status is unknown.

### Fundraising and events

An October 2026 email listed a Chipotle fundraiser on November 7 and a school bake sale on November 18–19. These dates are seed information requiring verification before publication.

Do not present expired or unverified events as upcoming. Keep dates, publication status, and event details editable through the content source.

### Missing information

The following may be incomplete:

- Individual team descriptions and logos.
- Leadership and student biographies.
- Team-specific email addresses.
- Coaches' and mentors' information.
- Current competition information and achievements.
- Current sponsors and sponsor logos.
- Future fundraising dates and locations.
- Newsletter signup URL.
- Donation and mentoring links.

Use graceful placeholders for missing information. Never invent facts to make the page look complete. Avoid empty cards, broken images, and prominent "coming soon" blocks unless they genuinely help visitors.

## 7. Google Sheets integration — required architecture

Use Google Sheets as a lightweight, read-only public content source. People with permission to edit the spreadsheet should be able to maintain the site's public information without editing the React code.

Use Google Sheets' **Publish to web** feature and published CSV feeds where practical. The site must consume only published, public content; it must not use an authenticated write-enabled spreadsheet connection.

Do not embed the entire spreadsheet as the site's user interface. Fetch its content and render it using the site's own components and design.

### Data-access layer

Create a dedicated module for spreadsheet configuration, fetching, parsing, validation, and normalization. Keep React components independent of the raw spreadsheet format.

Define TypeScript types for the entities actually used by the application, including as appropriate:

- Site content and configuration.
- Teams.
- Events and fundraisers.
- Sponsors and grant history.
- Outreach activities.
- Coaches and mentors.

Implement a clear data-access interface that makes it possible to replace the underlying source later without rewriting the presentation components.

### Configuration

Use centralized configuration for the published CSV feed URLs. A suitable initial approach is to configure separate URLs for the relevant tabs through Vite environment variables, with an `.env.example` documenting the expected variables.

Only public feed URLs belong in client-side environment variables. Do not add Google credentials, service-account keys, OAuth tokens, or other secrets.

Do not require an API key for the published CSV approach unless you establish a concrete technical reason to use a different Google integration.

The application must still run when no spreadsheet URLs have been configured.

### Data handling

The integration must:

- Fetch and parse CSV data safely.
- Normalize headers and handle blank cells.
- Validate required fields and tolerate optional fields.
- Handle malformed rows and invalid dates without crashing the entire application.
- Support explicit publication status, so unpublished entries are not shown.
- Provide loading, empty, and error states where appropriate.
- Use reasonable caching or request deduplication if needed.
- Avoid repeatedly fetching the same data for every component.
- Handle a failed or unconfigured feed gracefully.

Use locally supplied seed data or clearly identified sample content as a fallback. Make it possible to preview and develop the site without a live Google Sheet.

Do not silently treat stale or unverified event data as current. Make the event publication and date rules explicit.

### Security and privacy

Published spreadsheet content is public. Spreadsheet editor permissions restrict who can edit the original spreadsheet; they do not make published data private.

Document this clearly. Only public information should be placed in published tabs. Do not expose private student contact information, unpublished notes, credentials, or personal information that does not belong on a public website.

The integration is strictly read-only. Do not implement POST requests, write access, spreadsheet editing UI, or authentication.

### Documentation

Document:

- The expected spreadsheet tabs and exact header names.
- Which fields are required and which are optional.
- How to create a spreadsheet and publish individual tabs as CSV.
- How to configure the feed URLs locally and in a future hosting environment.
- How to test with sample data before the real sheet is ready.
- How to troubleshoot a failed feed.
- Which content must never be put in a published tab.

Create an example schema with useful sample rows. Do not invent live spreadsheet IDs or claim the integration has been connected when it has not.

## 8. Assets and content management

Preserve the existing `assets/` folder.

Use supplied newsletter artwork, QR codes, team logos, and photographs appropriately. Keep original files intact.

Organize imported assets sensibly under the source assets directory or public directory, depending on how they need to be referenced.

Use meaningful filenames for any newly created assets. Add appropriate alt text and responsive sizing.

The newsletter QR code must remain scannable. Do not add filters, distortions, or overlays that reduce scan reliability.

Create a clear distinction between static assets managed in the repository and text/event content managed through Sheets.

## 9. Engineering quality

Implement:

- Strict TypeScript.
- Reusable, appropriately scoped React components.
- Semantic HTML.
- Accessible navigation and keyboard interaction.
- Visible focus states.
- Sufficient color contrast.
- Responsive layouts for mobile, tablet, and desktop.
- Appropriate page titles and meta descriptions.
- Basic social-sharing metadata.
- Favicon handling.
- Reasonable image optimization and loading behavior.
- A useful README and `.gitignore`.

Keep the application lightweight. Avoid unnecessary dependencies and premature abstractions.

Do not introduce a backend or make a contact form appear functional without a real integration.

## 10. Tooling and scripts

Configure and verify these npm scripts:

- `dev`
- `build`
- `preview`
- `lint`
- `typecheck`
- `format`
- `format:check`
- `test` or a clearly documented equivalent

Use a current compatible testing setup, such as Vitest and React Testing Library, where useful.

Add meaningful tests for important behavior, especially CSV parsing, data validation, publication filtering, fallback behavior, and key user-facing components.

Remember that a successful Vite build alone does not guarantee that TypeScript type checking has passed. Run type checking explicitly.

## 11. Implementation plan

Work through these phases:

1. Inspect the workspace, project brief, and assets.
2. Scaffold React, Vite, TypeScript, styling, and development tooling directly in the existing project root.
3. Establish the application structure and design tokens.
4. Implement the initial responsive website using the supplied information.
5. Implement the typed Google Sheets CSV integration and local fallback data.
6. Add the necessary documentation and example configuration.
7. Run formatting, linting, type checking, tests, and the production build.
8. Fix problems introduced by your changes and rerun the affected checks.
9. Summarize the implementation, commands executed, verification results, and outstanding decisions.

Work autonomously on routine implementation choices. Ask me only when a genuinely blocking decision cannot be resolved safely from the available information.

## 12. Boundaries

- Do not deploy or publish the website.
- Do not push to GitHub or configure a remote repository.
- Do not create external accounts or purchase services.
- Do not create or publish a live Google Sheet on my behalf.
- Do not make external changes or destructive modifications without approval.
- Do not invent factual content, team identities, logos, credentials, or URLs.
- Do not claim that a test, build, or integration works unless you have actually verified it.

## Definition of done

The current `robonatick` directory contains a runnable, responsive React + Vite + TypeScript website with a coherent RoboNatick visual identity, the five main site sections, the three team profiles, appropriate use of supplied assets, a documented read-only Google Sheets content integration, graceful fallback behavior, and working verification scripts.

The project should be ready for me to review locally and populate with confirmed team information. The live spreadsheet and deployment can be configured afterward.

Begin by inspecting the existing workspace and assets. Then implement the project rather than returning only a plan or a set of commands.