import { describe, expect, it } from 'vitest'
import { normalizeHeader, optionalPublicUrl, parseCsv, readPublishedRecords } from './csv'

describe('parseCsv', () => {
  it('handles a BOM, CRLF lines, escaped quotes, commas, and embedded newlines', () => {
    expect(
      parseCsv(
        '\uFEFFName,Description\r\n"RoboNatick","Builds, tests"\r\n"A","A ""quoted""\nline"',
      ),
    ).toEqual([
      ['Name', 'Description'],
      ['RoboNatick', 'Builds, tests'],
      ['A', 'A "quoted"\nline'],
    ])
  })

  it('rejects an unterminated quoted field', () => {
    expect(() => parseCsv('name,description\n"RoboNatick')).toThrow(
      'CSV ended before a quoted field was closed.',
    )
  })
})

describe('published CSV records', () => {
  it('normalizes headers, trims cells, and includes only explicitly published rows', () => {
    const result = readPublishedRecords(
      'Team Number, team-name ,published\n3737, RedHawks , yes\n5436,Cyber Hawks,false\n6032,Lightning Hawks,',
    )

    expect(normalizeHeader('Team Name')).toBe('team_name')
    expect(result.records).toEqual([
      { team_number: '3737', team_name: 'RedHawks', published: 'yes' },
    ])
  })

  it('rejects duplicate headers and feeds without publication status', () => {
    expect(() => readPublishedRecords('name,Name,published')).toThrow(
      'The CSV feed contains duplicate column names.',
    )
    expect(() => readPublishedRecords('name\nRoboNatick')).toThrow(
      'The CSV feed must include a published column.',
    )
  })
})

describe('optionalPublicUrl', () => {
  it('accepts HTTP(S) links and refuses executable schemes', () => {
    expect(optionalPublicUrl('https://example.org/teams', 'team_url')).toBe(
      'https://example.org/teams',
    )
    expect(() => optionalPublicUrl('javascript:alert(1)', 'team_url')).toThrow(
      'team_url must use HTTP or HTTPS.',
    )
    expect(optionalPublicUrl('', 'team_url')).toBeUndefined()
  })
})
