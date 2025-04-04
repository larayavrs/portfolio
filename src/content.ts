import { glob } from "astro/loaders";
import { z, defineCollection } from "astro:content";

const post = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/posts" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      image: image().optional(),
      tags: z.array(z.string()).optional(),
      draft: z.boolean().optional(),
      featured: z.boolean().optional(),
    }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      description: z.string(),
      tags: z.array(z.string()).optional(),
      image: image(),
      link: z.string().url(),
      started: z.coerce.date().optional(),
      finished: z.coerce.date().optional(),
    }),
});

export const collections = { post, projects };
