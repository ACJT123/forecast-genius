import { ReactNode } from "react";

export default function CardSm({ children }: { children: ReactNode }) {
  return <div className="bg-[#111e25] rounded-lg">{children}</div>;
}
