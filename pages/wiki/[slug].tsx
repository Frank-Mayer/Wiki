import Head from "next/head";
import { Title } from "../../components/Title";
import { WikiPage } from "../../lib/data";
import { getAllPages } from "../../lib/data";
import { slugToTitle, slugToUrl, isDefaultDataKey } from "../../lib/string";

export const getStaticProps = async (context: any) => {
  const slug = context.params?.slug;
  const allPages = await getAllPages();
  const page = allPages.find((p) => slugToUrl(p.slug) === slug);
  return {
    props: {
      page,
      allPages,
    },
  };
};

export const getStaticPaths = async () => {
  return {
    paths: (await getAllPages()).map((page) => ({
      params: { slug: slugToUrl(page.slug) },
    })),
    fallback: false,
  };
};

const Page = (props: { page: WikiPage }) => (
  <>
    <Head>
      <meta property="twitter:card" content="summary" />
      <title>Reost – {slugToTitle(props.page.slug)}</title>
      <meta
        property="og:title"
        content={"Reost – " + slugToTitle(props.page.slug)}
      />
      <meta
        property="twitter:title"
        content={"Reost – " + slugToTitle(props.page.slug)}
      />
      {props.page.meta.map(([key, value]) =>
        key.startsWith("meta:") ? (
          <>
            <meta key={"meta." + key} name={key.substring(5)} content={value} />
            <meta property={"og:" + key.substring(5)} content={value} />
            <meta property={"twitter:" + key.substring(5)} content={value} />
          </>
        ) : key === "image" ? (
          <>
            <meta
              name="image"
              property="og:image"
              content={`/images/${props.page.slug}/${value}`}
            />
            <meta
              name="twitter:image:src"
              content={`/images/${props.page.slug}/${value}`}
            />
            <meta
              property="twitter:image"
              content={`/images/${props.page.slug}/${value}`}
            />
          </>
        ) : null
      )}
    </Head>
    <Title>{slugToTitle(props.page.slug)}</Title>
    <div className="flex my-4 items-stretch justify-evenly flex-col sm:flex-row">
      <ul className="my-4">
        {props.page.toc.map((item) => (
          <li
            key={"toc." + item.text}
            style={{
              paddingLeft: item.level * 0.5 + "rem",
            }}
          >
            <a
              className="text-slate-200 hover:text-slate-50 underline"
              href={"#" + item.anchor}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
      <div>
        {props.page.meta
          .filter((x) => x[0] === "image")
          .map(([key, value]) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={"meta." + key}
              className="w-full sm:max-w-xs text-slate-400"
              alt={props.page.slug + " " + key}
              src={`/images/${props.page.slug}/${value}`}
            />
          ))}
        <table className="table-auto w-full sm:max-w-xs h-auto prose prose-invert">
          <tbody>
            {props.page.meta
              .filter((meta) => isDefaultDataKey(meta[0]))
              .map((meta) => (
                <tr key={"meta." + meta[0]}>
                  <td
                    className="text-slate-200"
                    dangerouslySetInnerHTML={{ __html: meta[0] }}
                  />
                  <td
                    className="text-slate-400"
                    dangerouslySetInnerHTML={{ __html: meta[1] }}
                  />
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
    <article
      className="prose prose-invert w-fit mx-auto"
      dangerouslySetInnerHTML={{ __html: props.page.content }}
    />
  </>
);

export default Page;
