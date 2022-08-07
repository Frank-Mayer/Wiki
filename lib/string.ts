export const slugToUrl = (slug: string) => slug.trim().replace(/\s+/g, "_");

export const slugToTitle = (slug: string) =>
  slug
    .trim()
    .replace(/[_-]+/g, " ")
    .replace(/[a-z][A-Z]/g, (x) => x[0] + " " + x[1]);
