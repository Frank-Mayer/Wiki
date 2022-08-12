import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Title } from "../components/Title";
import { getAllPages } from "../lib/data";

export const getStaticProps = async () => {
  return {
    props: {
      allPages: await getAllPages(),
    },
  };
};

const Person = (props: {
  name: string;
  role: string;
  image: string;
  links?: {
    Instagram?: string;
    Website?: string;
    GitHub?: string;
  };
}) => (
  <>
    <p>
      <Image src={props.image} height="48px" width="48px" alt="" />{" "}
      <b>{props.name}</b> – {props.role}
    </p>
    {props.links ? (
      <ul>
        {Object.keys(props.links).map((key) => {
          const val = props.links![key as keyof typeof props.links];
          if (!val) {
            return null;
          }

          const url =
            key === "Instagram"
              ? "https://instagram.com/" + val
              : key === "GitHub"
              ? "https://github.com/" + val
              : val.startsWith("http")
              ? val
              : "https://" + val;
          return (
            <li key={key}>
              <Link href={url}>
                <a>
                  {key + ": "}
                  <span className="underline">{val}</span>
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    ) : null}
  </>
);

const Page = () => {
  return (
    <>
      <Head>
        <title>Reost – Über uns</title>
      </Head>
      <Title>Über uns</Title>
      <p className="text-slate-400">
        <ul className="flex flex-col gap-8">
          <li>
            <Person
              name="EasySIX"
              role="Eigentümer"
              links={{
                Instagram: "easysix",
              }}
              image="/images/_team/EasySIX.png"
            />
          </li>
          <li>
            <Person
              name="Anny"
              role="Admin"
              links={{
                Instagram: "ichbinanny",
              }}
              image="/images/_team/Anny.png"
            />
          </li>
          <li>
            <Person
              name="Germanja"
              role="Admin"
              links={{
                Instagram: "ichbinmanja",
              }}
              image="/images/_team/Germanja.png"
            />
          </li>
          <li>
            <Person
              name="tsukinoko_kun"
              role="Programmierer"
              links={{
                GitHub: "Frank-Mayer",
                Website: "frank-mayer.io",
              }}
              image="/images/_team/tsukinoko_kun.png"
            />
          </li>
          <li>
            <Person
              name="Majeve"
              role="Baumeister"
              image="/images/_team/Majeve.png"
            />
          </li>
        </ul>
      </p>
    </>
  );
};

export default Page;
