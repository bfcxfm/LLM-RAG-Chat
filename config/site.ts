export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "AKI Chat",
  description:
    "AKI chatbot that leverages context knowledge retrieval for enriched, conversational experiences",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Docs",
      href: "/#",
    },
    {
      label: "Chat",
      href: "/aki",
    },
    {
      label: "About",
      href: "/#",
    },
  ],
  navMenuItems: [
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Chat",
      href: "/aki",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
  ],
  links: {
    github: "https://github.com/bfcxfm/LLM-RAG-Chat",
  },
};
