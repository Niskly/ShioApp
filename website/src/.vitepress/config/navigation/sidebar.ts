import type { DefaultTheme } from "vitepress"

const sidebar: DefaultTheme.SidebarMulti = {
  "/download/": defaultSidebar(),
  "/docs/": defaultSidebar(),
}

function defaultSidebar(): DefaultTheme.SidebarItem[] {
  return [
    {
      items: [
        { text: "Download", link: "/download/" },
      ],
    },
    {
      text: "Frequently Asked Questions",
      items: [
        { text: "General", link: "/docs/faq/general" },
        { text: "Library", link: "/docs/faq/library" },
        { text: "Reader", link: "/docs/faq/reader" },
        { text: "Downloads", link: "/docs/faq/downloads" },
        { text: "Storage", link: "/docs/faq/storage" },
      ],
    },
    {
      text: "Guides",
      items: [
        { text: "Getting started", link: "/docs/guides/getting-started" },
        { text: "Tracking", link: "/docs/guides/tracking" },
        { text: "Backups", link: "/docs/guides/backups" },
        {
          text: "Troubleshooting",
          link: "/docs/guides/troubleshooting/",
          collapsed: true,
          items: [
            { text: "Common issues", link: "/docs/guides/troubleshooting/common-issues" },
            { text: "Diagnosis", link: "/docs/guides/troubleshooting/diagnosis" },
          ],
        },
      ],
    },
  ]
}

export default sidebar
