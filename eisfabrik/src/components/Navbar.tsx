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
import { useState } from "react";

export default function Navbar() {
  const { setTheme } = useTheme();
  const [mode, setMode] = useState("dark");

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
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/blog">Blog</Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/about">About</Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/log-in">Log In</Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Button variant="outline" size="icon" onClick={() => toggleTheme()}>
            {mode === "light" && (
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            )}
            {mode === "dark" && (
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            )}
          </Button>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
