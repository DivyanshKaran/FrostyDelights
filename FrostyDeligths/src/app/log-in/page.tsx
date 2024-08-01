import { Authentication } from "@/components/ui/Authentication";
import React from "react";

export default function Page() {
  return (
    <div>
      <Authentication type="login" className="w-[30rem] mx-auto mt-[10vh]" />
    </div>
  );
}
