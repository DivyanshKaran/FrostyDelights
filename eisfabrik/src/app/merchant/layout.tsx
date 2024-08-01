"use client";
import {
  AppShell,
  Burger,
  AppShellHeader,
  AppShellMain,
  AppShellNavbar,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Sidebar } from "@/components/ui/Sidebar";
import Link from "next/link";
import Logo from "@/components/ui/Logo";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [opened, { toggle }] = useDisclosure();
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
    >
      <AppShellHeader>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <Link href="/">
          <Logo />
        </Link>
      </AppShellHeader>
      <AppShellNavbar>
        <Sidebar />
      </AppShellNavbar>
      <AppShellMain></AppShellMain>
    </AppShell>
  );
}
