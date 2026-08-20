export type HrefKind = "internal" | "same-document" | "external" | "contact" | "invalid"

// A URL that is valid only with a base is a relative internal URL.
const RELATIVE_HREF_BASE = "https://internal.invalid"

export function classifyHref(href: string): HrefKind {
  if (!href || href.startsWith("//")) {
    return "invalid"
  }

  if (href.startsWith("#") || href.startsWith("?")) {
    return "same-document"
  }

  try {
    const url = new URL(href)

    switch (url.protocol) {
      case "http:":
      case "https:":
        return "external"

      case "mailto:":
      case "tel:":
        return "contact"

      default:
        return "invalid"
    }
  } catch {
    try {
      // oxlint-disable-next-line no-new
      new URL(href, RELATIVE_HREF_BASE)
      return "internal"
    } catch {
      return "invalid"
    }
  }
}
