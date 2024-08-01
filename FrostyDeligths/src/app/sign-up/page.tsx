"use client";
import { Authentication } from "@/components/ui/Authentication";
import React from "react";

export default function Page() {
  return (
    <div className="mx-auto mt-[5vh] w-[50vw]">
      <Authentication type="register" />
    </div>
  );
}
