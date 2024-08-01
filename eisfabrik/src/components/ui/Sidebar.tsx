"use client";
import { Code, Group, useMantineTheme } from "@mantine/core";
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
  { link: "merchant/dashboard", label: "Dashboard", icon: IconDashboard },
  { link: "merchant/community", label: "Community", icon: IconBrandEnvato },
  { link: "merchant/register", label: "Register", icon: IconReportAnalytics },
  { link: "merchant/chat", label: "Chat", icon: IconMessage },
  { link: "merchant/shop", label: "Shop", icon: IconShoppingCart },
  {
    link: "merchant/account-settings",
    label: "Account Settings",
    icon: IconSettings,
  },
];

export function Sidebar() {
  const [active, setActive] = useState("Billing");
  const theme = useMantineTheme();

  const links = data.map((item) => (
    <Link
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));
  // console.log(theme.colors);

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          <Code fw={700} className={classes.version}>
            Eisfabrik
          </Code>
        </Group>
        {links}
      </div>

      <div className={classes.footer}>
        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}
