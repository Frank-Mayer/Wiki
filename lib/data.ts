import { readdir, readFile } from "fs/promises";
import { join } from "path";
import matter from "gray-matter";
import { Converter } from "showdown";
import { showdownToc } from "./showdownToc";
import type { TocItem } from "./showdownToc";
import { deepCopy } from "./deepCopy";
import { showdownImage } from "./showdownImage";
import { slugToTitle } from "./string";

export type WikiPageMeta = [string, string];

export type WikiPage = {
  readonly slug: string;
  readonly meta: ReadonlyArray<WikiPageMeta>;
  readonly content: string;
  readonly toc: ReadonlyArray<TocItem>;
};

const contentDir = "_content";

export const getAllPages = async (): Promise<ReadonlyArray<WikiPage>> => {
  const pages = new Array<WikiPage>();

  for (const file of await readdir(contentDir)) {
    if (file.endsWith(".md")) {
      const pageMatter = matter(await readFile(join(contentDir, file), "utf8"));
      const slug = file.substring(0, file.length - 3);
      const mdData = { toc: new Array<TocItem>() };
      const converter = new Converter({
        tables: true,
        ghCodeBlocks: true,
        tasklists: true,
        emoji: true,
        extensions: [showdownToc(mdData), showdownImage(slug)],
      });

      pages.push({
        slug,
        meta: Object.keys(pageMatter.data).map((key) => [
          key,
          pageMatter.data[key],
        ]),
        content: converter.makeHtml(pageMatter.content),
        toc: mdData.toc,
      });
    }
  }

  for (const targetPage of pages) {
    const pageTitleRegex = new RegExp(
      slugToTitle(targetPage.slug)
        .replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
        .replace(/\s+/g, "\\s+"),
      "gi"
    );

    for (const sourcePage of pages) {
      if (targetPage.slug === sourcePage.slug) {
        continue;
      }

      (sourcePage as any).content = sourcePage.content.replace(
        pageTitleRegex,
        (match) => {
          return `<a href="/wiki/${targetPage.slug}">${match}</a>`;
        }
      );
    }
  }

  return pages;
};
