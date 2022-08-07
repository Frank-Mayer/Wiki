import Head from "next/head";
import { useRouter } from "next/router";
import { Title } from "../components/Title";

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
    </>
  );
};

export default Page;
