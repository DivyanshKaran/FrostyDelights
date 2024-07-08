"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { setTheme } = useTheme();
  const [mode, setMode] = useState("light");

  function toggleTheme() {
    // console.log("Toggle");
    if (mode === "light") {
      setMode("dark");
      setTheme("dark");
    } else {
      setMode("light");
      setTheme("light");
    }
  }
  return (
    <NavigationMenu className="bg-[--background] text-[--text] text-[30px] min-w-[90%] grid grid-cols-[20%_50%_20%] gap-[5%] left-[5%] px-[30px] py-[12px] mt-[10px] absolute rounded-full items-center">
      <NavigationMenuList className="justify-start p-[2px]">
        <NavigationMenuItem className="p-[2px]">
          <Link href="/">Logo</Link>
        </NavigationMenuItem>
      </NavigationMenuList>
      <NavigationMenuList className="flex justify-between">
        <NavigationMenuItem>
          <Link href="/blog" className="hover:text-[--green]">
            Blog
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/about" className="hover:text-[--green]">
            About
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/log-in" className="hover:text-[--green]">
            Log In
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem className="">
          <Link
            href="/sign-up"
            className="bg-[--toggle-background] hover:bg-[--green] text-[--toggle-text] rounded-full p-[8px]"
          >
            Sign-up
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
      <NavigationMenuList className="justify-end h-[32px]">
        <NavigationMenuItem>
          <Button
            variant="outline"
            size="icon"
            // className="h-[30px]"
            onClick={() => toggleTheme()}
          >
            {mode === "light" && <Sun className="" />}
            {mode === "dark" && <Moon className="" />}
          </Button>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
