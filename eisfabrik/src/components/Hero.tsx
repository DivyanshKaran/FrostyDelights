import React, { ReactNode } from "react";

interface HeroProps {
  children?: ReactNode;
}

export default function Hero({ children }: HeroProps) {
  return <div>{children}</div>;
}
