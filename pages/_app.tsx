import "../styles/index.scss";
import type { AppProps } from "next/app";
import { Header } from "../components/Header";
import Head from "next/head";
import { Footer } from "../components/Footer";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Header allPages={pageProps.allPages} />
    <main className="bg-slate-900 py-20 px-4">
      <Component {...pageProps} />
    </main>
    <Footer />
  </>
);

export default MyApp;
