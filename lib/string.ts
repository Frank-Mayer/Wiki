export const slugToUrl = (slug: string) => slug.trim().replace(/\s+/g, "_");

export const slugToTitle = (slug: string) =>
  slug
    .trim()
    .replace(/[_-]+/g, " ")
    .replace(/[a-z][A-Z]/g, (x) => x[0] + " " + x[1]);

export const escapeHtml = (unsafe: string) =>
  unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

export const isDefaultDataKey = (key: string) =>
  key !== "image" && !key.startsWith("meta:");
