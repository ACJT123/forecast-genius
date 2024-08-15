import { ReactNode } from "react";

type ICard = {
  children: ReactNode;
  className?: string;
};

export default function Card({ className, children }: ICard) {
  return (
    <div className={`bg-[#132028]/70 rounded-2xl p-4 ${className}`}>
      {children}
    </div>
  );
}
