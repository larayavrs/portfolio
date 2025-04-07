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
