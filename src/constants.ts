import type { IconMap, SocialHref, Website } from "@/types";

export const website: Website = {
  title: "larayavrs",
  brief: "A powerful portfolio used for my personal projects and experiments.",
  href: "https://larayavrs.vercel.app",
  author: "larayavrs",
  locale: "es-ES",
  howManyFeaturedPosts: 3,
  postsPerPage: 4,
};

export const navigation: SocialHref[] = [
  {
    href: "/blog",
    label: "blog",
  },
  {
    href: "/projects",
    label: "projects",
  },
  {
    href: "/about",
    label: "about",
  },
  {
    href: "/contact",
    label: "contact",
  },
];

export const socials: SocialHref[] = [
  {
    href: "https://github.com/larayavrs",
    label: "GitHub",
  },
  {
    href: "https://instagram.com/leoosdk",
    label: "Instagram",
  },
  {
    href: "mailto:larayavrs@gmail.com",
    label: "Email",
  },
  {
    href: "/rss.xml",
    label: "RSS",
  },
];

export const icons: IconMap = {
  Github: "lucide:github",
  Instagram: "lucide:instagram",
  Email: "lucide:mail",
  RSS: "lucide:rss",
};
