import { readdir, readFile } from "fs/promises";
import { join } from "path";
import matter from "gray-matter";
import { Converter } from "showdown";
import { showdownToc } from "./showdownToc";
import type { TocItem } from "./showdownToc";
import { showdownImage } from "./showdownImage";
import { escapeHtml, isDefaultDataKey, slugToTitle } from "./string";

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
          escapeHtml(
            typeof pageMatter.data[key] === "string"
              ? pageMatter.data[key]
              : JSON.stringify(pageMatter.data[key])
          ),
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

    const makeAnchor = (match: string) =>
      `<a href="/wiki/${targetPage.slug}">${match}</a>`;

    for (const sourcePage of pages) {
      if (targetPage.slug === sourcePage.slug) {
        continue;
      }

      (sourcePage as any).content = sourcePage.content.replace(
        pageTitleRegex,
        makeAnchor
      );

      for (const m of sourcePage.meta) {
        if (isDefaultDataKey(m[0])) {
          if (typeof m[0] === "string") {
            m[0] = m[0].replace(pageTitleRegex, makeAnchor);
          }

          if (typeof m[1] === "string") {
            m[1] = m[1].replace(pageTitleRegex, makeAnchor);
          }
        }
      }
    }
  }

  return pages;
};
