# Public content feeds

The website reads published CSV tabs with unauthenticated HTTP `GET` requests. It never edits the
spreadsheet. Publishing a tab makes its rows public even if the spreadsheet itself is restricted
to editors. Do not publish private student contact information, credentials, unpublished notes, or
other personal information that should not appear on a public website.

The CSV tabs below are optional and independently configured. Add each feed URL to the matching
`VITE_SHEETS_*_CSV_URL` variable in `.env.local` for local work, and configure the same public URL
in the future hosting environment. These `VITE_` values are bundled into browser code; they are
appropriate only for public feed URLs, never secrets.

## Tabs and headers

Header names are case-insensitive; spaces and hyphens are treated as underscores. Keep the names
below for consistency. Every tab must include a `published` column. A row is public only when its
value is `true`, `yes`, `1`, or `published` (case-insensitive). Leave it blank or set it to `false`
while drafting. Unpublished rows do not appear on the website.

| Tab        | Environment variable           | Required headers                             | Optional headers                                       |
| ---------- | ------------------------------ | -------------------------------------------- | ------------------------------------------------------ |
| `Teams`    | `VITE_SHEETS_TEAMS_CSV_URL`    | `number`, `name`, `level`, `published`       | `description`, `logo_url`, `team_url`, `contact_email` |
| `Events`   | `VITE_SHEETS_EVENTS_CSV_URL`   | `title`, `date`, `published`                 | `location`, `description`, `url`                       |
| `Support`  | `VITE_SHEETS_SUPPORT_CSV_URL`  | `name`, `kind`, `status`, `published`        | `description`, `url`                                   |
| `Outreach` | `VITE_SHEETS_OUTREACH_CSV_URL` | `name`, `description`, `status`, `published` | —                                                      |
| `Mentors`  | `VITE_SHEETS_MENTORS_CSV_URL`  | `name`, `role`, `published`                  | `bio`, `email`                                         |
| `Site`     | `VITE_SHEETS_SITE_CSV_URL`     | `key`, `value`, `published`                  | —                                                      |

### Field rules

- `Teams.number` contains digits. The configured Teams tab is the published team roster, so include
  every team intended to appear.
- `Events.date` uses `YYYY-MM-DD`. Invalid dates are ignored with a visible warning. Past dates
  are not displayed as upcoming, even if their rows are published.
- `Support.kind` is `grant`, `sponsor`, or `other`; `Support.status` is `current` or `past`.
  List an organization as a current sponsor only when that relationship is confirmed. Historical
  seed entries are labeled as past support.
- `Outreach.status` is `reported` or `planned`, so proposed activity is not presented as completed.
- `Site.key` is one of `program_email`, `newsletter_signup_url`, or `ftc_url`. The value must be a
  valid email for `program_email` or an absolute HTTP(S) URL for links.
- Optional `team_url`, `logo_url`, `url`, and mentor email values are checked before use. URLs must
  use HTTP or HTTPS.

## Example rows

These rows illustrate the format. Sample `published=false` values are deliberate: replace the
examples with reviewed content and explicitly publish only entries that are ready for the public
site. A configured tab becomes the canonical list for its content type.

```csv
number,name,level,description,logo_url,team_url,contact_email,published
3737,RedHawks,Varsity,,,,,false
5436,Cyber Hawks,JV,,,,,false
6032,Lightning Hawks,Freshman,,,,,false
```

```csv
title,date,location,description,url,published
Example event,2030-01-01,Replace with confirmed location,Replace with confirmed details,,false
```

```csv
name,kind,status,description,url,published
Example organization,grant,past,Replace with verified support history,,false
```

```csv
name,description,status,published
Example activity,Replace with a verified description,reported,false
```

```csv
name,role,bio,email,published
Example mentor,Replace with a confirmed public role,,,false
```

```csv
key,value,published
program_email,robonatickredhawks@gmail.com,false
newsletter_signup_url,https://forms.gle/cRVqiHK3hPo1Tb1LA,false
ftc_url,https://www.firstinspires.org/robotics/ftc,false
```

## Create and publish the feeds

1. Create a Google spreadsheet with one tab for each content type you plan to manage. Use the
   headers above in row 1; put one content item per subsequent row.
2. Review rows for accuracy and public suitability. Keep drafts unpublished.
3. In Google Sheets, use **File → Share → Publish to web**. Publish an individual tab as a
   comma-separated values (`.csv`) feed. Repeat for each tab that the site will consume.
4. Copy each tab's published CSV URL into its corresponding variable in `.env.local` for local
   preview. Do not paste an editor URL or add a Google API credential.
5. Run `npm run dev`, review all sections, and verify that only intended, published information
   appears. Configure the same public URLs in the hosting environment when deployment is chosen.

With no feed URLs configured, local seed content allows the site to run without a spreadsheet.
The example rows above remain hidden unless their `published` values are deliberately changed.

## Troubleshooting

- An unconfigured feed uses local seed content.
- A failed HTTP request or malformed CSV shows a page warning and falls back to seed content.
- A published row missing required fields or containing an invalid date/link is skipped; the issue
  appears in the feed warning.
- A feed that loads successfully but has no published rows displays its empty state. Confirm the
  publication values, exact headers, and public CSV URL.
- If a published feed is not accessible from the site, check that the tab itself was published and
  that the published URL is publicly readable as CSV. No API key is needed.
