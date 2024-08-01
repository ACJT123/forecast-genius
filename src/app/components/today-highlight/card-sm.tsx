import { ReactNode } from "react";

export default function CardSm({ children }: { children: ReactNode }) {
  return <div className="bg-[#111e25] rounded-2xl p-4">{children}</div>;
}
