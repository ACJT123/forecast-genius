import { ReactNode } from "react";

export default function Card({ children }: { children: ReactNode }) {
  return <div className="bg-[#132028]/70 rounded-2xl p-4">{children}</div>;
}
