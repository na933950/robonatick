# RoboNatick repository guidance

## Project shape

- This is a static, single-page React + TypeScript site. The five primary sections are in-page
  anchors in `src/App.tsx`; keep navigation on that model unless the information architecture
  genuinely grows into separate routes.
- `src/data/` is the boundary between raw published CSV and the presentation. Add or change
  spreadsheet fields in the data types, validation/normalization, and `docs/google-sheets.md`;
  components should consume `SiteContent`, not raw CSV rows.
- Local content in `src/data/seed.ts` keeps the site useful without a spreadsheet. A configured
  feed is canonical for its content type; a failed feed falls back to seed data and reports a
  visible warning.
- A row must be explicitly published. Upcoming events require a valid `YYYY-MM-DD` date that is
  not in the past. Keep historical support labeled as past, and keep planned outreach distinct
  from reported activity.
- Published Sheets feeds are public and read-only. Never add credentials, write access, private
  student contact details, or unpublished notes to the client-side integration.
- `.github/mcp.json` configures the isolated Playwright MCP server for browser checks on localhost.
- Preserve source artwork under `assets/`. The newsletter QR is a real signup link; do not crop,
  distort, redraw, or filter it.

## Commands

- `npm run dev` starts the local site.
- `npm run build` performs strict TypeScript project checks and creates the static build.
- `npm run lint` runs ESLint; `npm run typecheck` runs TypeScript checks independently.
- `npm test` runs the full Vitest suite. Run one file with
  `npm run test -- src/data/csv.test.ts` or filter by test name with
  `npm run test -- -t "published rows"`.
- `npm run format` formats maintained source and documentation; use `npm run format:check` to
  verify without writing.

Keep feed schema changes, examples, fallback behavior, and their focused tests in sync.
