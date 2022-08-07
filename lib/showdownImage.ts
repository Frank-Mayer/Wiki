import type { ShowdownExtension } from "showdown";
import { slugToTitle } from "./string";

const srcToAlt = (src: string): string => slugToTitle(src.split(".")[0]);

const imgRegex = (
  slug: string
): Array<[RegExp, (...args: string[]) => string]> => [
  [
    /<img\s+src="(.*?)"\s*\/?>/gi,
    (_: string, src: string) => {
      const alt = srcToAlt(src);
      return `<img src="/images/${slug}/${src}" alt="${alt}" /><span style="opacity:0.5">${alt}</span>`;
    },
  ],
  [
    /<img\s+src="([^"]+)"\s+alt="[^"]+"\s*\/?>/gi,
    (_: string, src: string, alt: string) =>
      `<img src="/images/${slug}/${src}" alt="${alt}" /><span style="opacity:0.5">${alt}</span>`,
  ],
  [
    /<img\s+alt="([^"]+)"\s+src="[^"]+"\s*\/?>/gi,
    (_: string, alt: string, src: string) =>
      `<img src="/images/${slug}/${src}" alt="${alt}" /><span style="opacity:0.5">${alt}</span>`,
  ],
];

export const showdownImage = (slug: string): ShowdownExtension => ({
  type: "output",
  filter: (text: string) => {
    for (const regex of imgRegex(slug)) {
      if (regex[0].test(text)) {
        return text.replace(regex[0], regex[1]);
      }
    }
    return text;
  },
});
