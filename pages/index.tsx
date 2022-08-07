import type { NextPage } from "next";
import Head from "next/head";
import { Title } from "../components/Title";
import { getAllPages } from "../lib/data";

export const getStaticProps = async () => {
  return {
    props: {
      allPages: await getAllPages(),
    },
  };
};

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Reost Wiki</title>
        <meta
          name="description"
          content="Das offizielle Reost Wiki vom Server Team"
        />
      </Head>

      <main>
        <Title>Reost Wiki</Title>
        <p className="text-slate-50">
          Willkommen im offiziellen Reost Wiki! Hier findest Du alle
          Informationen, die das Serverteam veröffentlichen möchte.
        </p>
      </main>
    </div>
  );
};

export default Home;
