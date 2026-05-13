export function timelineEventsFromRows(rows: unknown[] | null | undefined): unknown[] {
  if (!rows?.length) return []

  const first = rows[0] as Record<string, unknown>
  const meta = first.meta as { body?: unknown } | undefined

  if (rows.length === 1 && Array.isArray(meta?.body)) {
    return meta.body as unknown[]
  }

  if (rows.length === 1 && Array.isArray(first.body)) {
    return first.body as unknown[]
  }

  return rows
}
