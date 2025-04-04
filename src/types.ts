/**
 * Represents the configuration of a website.
 */
export type Website = {
  title: string;
  brief: string;
  href: string;
  author: string;
  fullname: string;
  locale: string;
  postsPerPage: number;
  howManyFeaturedPosts: number;
};

/**
 * Represents a social media link or external reference.
 */
export type SocialHref = {
  href: string;
  label: string;
};

/**
 * Represents a mapping of icon names to their corresponding URLs or identifiers.
 */
export type IconMap = {
  // A key-value pair where the key is the icon name and the value is its URL or identifier. */
  [key: string]: string;
};
