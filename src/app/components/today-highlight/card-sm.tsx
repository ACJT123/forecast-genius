import { ReactNode } from "react";

type ICardSm = {
  children: ReactNode;
  title: string;
};

export default function CardSm({ children, title }: ICardSm) {
  return (
    <div className="bg-[#111e25] rounded-2xl p-4">
      <div className="mb-4">{title}</div>

      {children}
    </div>
  );
}
