"use client";
import { Button, Stack } from "@mantine/core";
import {
  IconBrandEnvato,
  IconDashboard,
  IconLogout,
  IconMessage,
  IconReportAnalytics,
  IconSettings,
  IconShoppingCart,
} from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
import classes from "../styles/Sidebar.module.css";

const data = [
  { link: "/merchant/dashboard", label: "Dashboard", icon: IconDashboard },
  { link: "/merchant/community", label: "Community", icon: IconBrandEnvato },
  { link: "/merchant/register", label: "Register", icon: IconReportAnalytics },
  { link: "/merchant/chat", label: "Chat", icon: IconMessage },
  { link: "/merchant/shop", label: "Shop", icon: IconShoppingCart },
  {
    link: "/merchant/account-settings",
    label: "Account Settings",
    icon: IconSettings,
  },
];

export function Sidebar() {
  const [active, setActive] = useState("Dashboard");
  // const theme = useMantineTheme();

  const links = data.map((item) => (
    <div
      // variant="default"
      // component={Link}
      className={classes.link}
      data-active={item.label === active || undefined}
      // href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <Link href={item.link} className="flex">
        <item.icon className={classes.linkIcon} stroke={1.5} />
        <span>{item.label}</span>
      </Link>
    </div>
  ));
  // console.log(theme.colors);

  return (
    <nav className={classes.navbar}>
      <Stack className={classes.navbarMain}>{links}</Stack>

      {/* <div className={classes.footer}> */}
      <Link
        href="/api/auth/logout"
        className={classes.link}
        onClick={(event) => event.preventDefault()}
      >
        <IconLogout className={classes.linkIcon} stroke={1.5} />
        <span>Logout</span>
      </Link>
      {/* </div> */}
    </nav>
  );
}
