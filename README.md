# RoboNatick

A responsive information site for Natick High School's student robotics program. The site is a
static React application; its published Google Sheets feeds are optional, public, and read-only.

## Run locally

```sh
npm install
npm run dev
```

To connect published CSV feeds, copy `.env.example` to `.env.local` and add the public CSV URLs.
Without configured feeds, the site uses the locally maintained seed content. The newsletter link
and QR code are taken from the supplied signup flyer.

## Commands

| Command                                | Purpose                                                              |
| -------------------------------------- | -------------------------------------------------------------------- |
| `npm run dev`                          | Start the Vite development server                                    |
| `npm run build`                        | Run TypeScript project checks and create the static production build |
| `npm run preview`                      | Preview the production build locally                                 |
| `npm run lint`                         | Run ESLint                                                           |
| `npm run typecheck`                    | Run strict TypeScript checks without building                        |
| `npm test`                             | Run the Vitest suite once                                            |
| `npm run test -- src/data/csv.test.ts` | Run one test file                                                    |
| `npm run format`                       | Format application code and maintained documentation                 |
| `npm run format:check`                 | Check formatting without writing files                               |

## Structure

- `src/App.tsx` composes the five in-page sections and handles responsive navigation and feed
  status.
- `src/data/` owns normalized content types, local seed data, CSV parsing, validation, and feed
  loading. Components consume typed `SiteContent` rather than spreadsheet rows.
- `src/index.css` contains the site design system and responsive styles. Tailwind CSS v4 is
  integrated through its Vite plugin and CSS-first theme.
- `.github/mcp.json` configures a headless, isolated Playwright MCP server for local browser
  checks. Its allowed origins are limited to localhost development URLs; Copilot CLI loads it when
  the project is trusted. Use `copilot mcp list` to inspect configured servers.
- `assets/` keeps the supplied originals; two small photos from the supplied archive are copied
  into `public/images/` for display. Do not modify the originals when replacing site imagery.
- `docs/google-sheets.md` explains the public spreadsheet schema and publishing workflow.

When a feed is configured, it is the source for that content type. Only rows explicitly marked
published are shown. If a feed cannot be loaded or parsed, the corresponding local seed content
remains visible and the page displays a warning. Past event dates are never shown as upcoming.

## Content and privacy

Google Sheets publication makes content public, regardless of the editor permissions on the
spreadsheet. Publish only information approved for the public website; never publish private
student contact details, credentials, or internal notes. The integration uses browser `GET`
requests only and does not write to Sheets.

The seed content reflects the current project brief and supplied assets. Team-specific biographies,
current sponsors, future events, and mentor identities are not inferred when they have not been
confirmed. The newsletter QR code links to the signup form shown on the supplied flyer.
