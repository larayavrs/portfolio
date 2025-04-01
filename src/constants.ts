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
