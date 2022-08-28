import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "../components/Button";
import { Title } from "../components/Title";
import { getAllPages } from "../lib/data";

export const getStaticProps = async () => {
  return {
    props: {
      allPages: await getAllPages(),
    },
  };
};

const Page = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Reost – 404</title>
      </Head>
      <Title>Seite nicht gefunden</Title>
      <p className="text-slate-400">
        Die Seite &quot;{router.asPath}&quot; konnte nicht gefunden werden.
      </p>
      <p>
        <Link href="/">
          <a>
            <Button>Zurück zur Startseite</Button>
          </a>
        </Link>
      </p>
    </>
  );
};

export default Page;
