import Link from "next/link";

export const Footer = () => (
  <footer className="sticky top-full w-full h-fit flex items-center justify-center my-16">
    <Link href="/about">
      <a className="text-slate-200 underline">Über uns</a>
    </Link>
  </footer>
);
