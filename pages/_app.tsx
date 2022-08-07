import "../styles/index.scss";
import type { AppProps } from "next/app";
import { Header } from "../components/Header";
import Head from "next/head";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Header pages={pageProps.allPages} />
    <main className="bg-slate-900 py-20 px-4">
      <Component {...pageProps} />
    </main>
  </>
);

export default MyApp;
