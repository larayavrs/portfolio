import { website } from "@/constants";
import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getAllPosts } from "@/lib/data";

export async function GET(context: APIContext) {
  try {
    const posts = await getAllPosts();
    return rss({
      title: website.title,
      description: website.brief,
      site: context.site ?? website.href,
      items: posts.map((post) => ({
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.date,
        link: `/blog/${post.id}`,
      })),
    });
  } catch (error) {
    console.error("Error generating RSS feed:", error);
    return new Response("Error generating RSS feed problem", { status: 500 });
  }
}
