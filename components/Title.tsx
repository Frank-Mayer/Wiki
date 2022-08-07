import type { ReactNode } from "react";

export const Title = (props: { children: ReactNode }) => (
  <h1 className="text-slate-50 text-6xl py-4">{props.children}</h1>
);
