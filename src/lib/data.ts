import { getCollection, type CollectionEntry } from "astro:content";

export async function getAllPosts(): Promise<CollectionEntry<"post">[]> {
  const posts = await getCollection("post");
  return posts
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getRecentPosts(
  count: number,
): Promise<CollectionEntry<"post">[]> {
  const posts = await getAllPosts();
  return posts.slice(0, count);
}

export async function getAdjacentPosts(currentId: string): Promise<{
  prev: CollectionEntry<"post"> | null;
  next: CollectionEntry<"post"> | null;
}> {
  const posts = await getAllPosts();
  const current = posts.findIndex((post) => post.id === currentId);
  if (current === -1) return { prev: null, next: null };
  return {
    next: current > 0 ? posts[current - 1] : null,
    prev: current < posts.length - 1 ? posts[current + 1] : null,
  };
}

export async function getAllProjects(): Promise<CollectionEntry<"projects">[]> {
  const projects = await getCollection("projects");
  return projects.sort((a, b) => {
    const adate = a.data.started?.getTime() || 0;
    const bdate = b.data.started?.getTime() || 0;
    return bdate - adate;
  });
}

export async function getAllTags(): Promise<Map<string, number>> {
  const posts = await getAllPosts();
  return posts.reduce((acc, post) => {
    post.data.tags?.forEach((tag) => {
      acc.set(tag, (acc.get(tag) || 0) + 1);
    });
    return acc;
  }, new Map<string, number>());
}

export async function getSortedTags(): Promise<
  { tag: string; count: number }[]
> {
  const tags = await getAllTags();
  return [...tags.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => {
      const countDifference = b.count - a.count;
      return countDifference !== 0
        ? countDifference
        : a.tag.localeCompare(b.tag);
    });
}

export function postsByYear(
  posts: CollectionEntry<"post">[],
): Record<string, CollectionEntry<"post">[]> {
  return posts.reduce(
    (acc: Record<string, CollectionEntry<"post">[]>, post) => {
      const year = post.data.date.getFullYear().toString();
      (acc[year] ??= []).push(post);
      return acc;
    },
    {},
  );
}

export function postsByMonth(
  posts: CollectionEntry<"post">[],
): Record<string, CollectionEntry<"post">[]> {
  return posts.reduce(
    (acc: Record<string, CollectionEntry<"post">[]>, post) => {
      const month = post.data.date.toLocaleString("default", { month: "long" });
      (acc[month] ??= []).push(post);
      return acc;
    },
    {},
  );
}

export async function postsByTag(
  tag: string,
): Promise<CollectionEntry<"post">[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => post.data.tags?.includes(tag));
}
