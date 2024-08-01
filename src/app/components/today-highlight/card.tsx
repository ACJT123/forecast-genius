import { ReactNode } from "react";

export default function Card({ children }: { children: ReactNode }) {
  return <div className="bg-[#132028]/70 rounded-lg">{children}</div>;
}
