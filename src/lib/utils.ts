export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>
    }
  : T

export function joinUrlPath(...parts: (string | undefined)[]): string {
  const segments = parts
    .filter((p): p is string => p != null)
    .map((p) => p.replace(/^\/+|\/+$/g, ''))
    .filter((s) => s.length > 0)

  return segments.length ? `/${segments.join('/')}` : '/'
}
