export type CsvRecord = Record<string, string>

export function parseCsv(input: string): string[][] {
  const text = input.replace(/^\uFEFF/, '')
  const rows: string[][] = []
  let row: string[] = []
  let field = ''
  let quoted = false

  for (let index = 0; index < text.length; index += 1) {
    const character = text[index]

    if (quoted) {
      if (character === '"') {
        if (text[index + 1] === '"') {
          field += '"'
          index += 1
        } else {
          quoted = false
        }
      } else {
        field += character
      }
      continue
    }

    if (character === '"') {
      if (field.length !== 0) {
        throw new Error('Unexpected quote in an unquoted CSV field.')
      }
      quoted = true
    } else if (character === ',') {
      row.push(field)
      field = ''
    } else if (character === '\n' || character === '\r') {
      row.push(field)
      if (row.some((cell) => cell.trim() !== '')) rows.push(row)
      row = []
      field = ''
      if (character === '\r' && text[index + 1] === '\n') index += 1
    } else {
      field += character
    }
  }

  if (quoted) throw new Error('CSV ended before a quoted field was closed.')
  row.push(field)
  if (row.some((cell) => cell.trim() !== '')) rows.push(row)
  return rows
}

export function normalizeHeader(header: string): string {
  return header
    .trim()
    .toLowerCase()
    .replace(/[\s-]+/g, '_')
}

export function readPublishedRecords(input: string): {
  records: CsvRecord[]
  issues: string[]
} {
  const [headerRow, ...dataRows] = parseCsv(input)
  if (!headerRow) throw new Error('The CSV feed has no header row.')

  const headers = headerRow.map(normalizeHeader)
  if (new Set(headers).size !== headers.length) {
    throw new Error('The CSV feed contains duplicate column names.')
  }
  if (!headers.includes('published')) {
    throw new Error('The CSV feed must include a published column.')
  }

  const records: CsvRecord[] = []
  const issues: string[] = []

  dataRows.forEach((cells, index) => {
    const record = Object.fromEntries(
      headers.map((header, cellIndex) => [header, (cells[cellIndex] ?? '').trim()]),
    )
    if (!isPublished(record.published)) return
    if (cells.length > headers.length) {
      issues.push(`Row ${index + 2}: extra values beyond the header columns were ignored.`)
    }
    records.push(record)
  })

  return { records, issues }
}

export function isPublished(value: string | undefined): boolean {
  return ['true', 'yes', '1', 'published'].includes(value?.trim().toLowerCase() ?? '')
}

export function optionalPublicUrl(
  value: string | undefined,
  field: string,
): string | undefined {
  const trimmed = value?.trim() ?? ''
  if (!trimmed) return undefined

  let url: URL
  try {
    url = new URL(trimmed)
  } catch {
    throw new Error(`${field} must be a valid absolute URL.`)
  }
  if (url.protocol !== 'https:' && url.protocol !== 'http:') {
    throw new Error(`${field} must use HTTP or HTTPS.`)
  }
  return url.toString()
}
