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
