# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Repository overview
- Stack: Astro 5 (static site) with React islands, Tailwind CSS v4 (via @tailwindcss/vite), astro-expressive-code (syntax highlighting), MD/MDX content collections, rss/sitemap integrations.
- Package manager: yarn (classic). Node version is not pinned in-repo.

Common commands
- Install deps: yarn
- Start dev server: yarn dev
  - Default: http://localhost:4321
- Build for production: yarn build (outputs dist/)
- Preview production build: yarn preview
- Astro CLI (misc): yarn astro <subcommand>
  - Type/content check: yarn astro check
  - Examples: yarn astro add, yarn astro -- --help
- Format (Prettier): yarn format

Notes on testing and linting
- There is no test runner configured (no Jest/Vitest) and no ESLint config. Formatting is enforced via Prettier (see .prettierrc.mjs). Use yarn format before commits.

High-level architecture
- Routing and pages (Astro)
  - src/pages/index.astro: Home page. Pulls recent posts via getRecentPosts from src/lib/data.ts and uses UI components.
  - src/pages/post/[...page].astro: Paginated blog listing. Uses getAllPosts and Astro’s paginate with page size from website.postsPerPage (src/constants.ts).
  - src/pages/post/[...id].astro: Individual post page generated with getStaticPaths from content collection ids. Renders MD/MDX via astro:content render to obtain Content and headings for the Table of Contents.
  - src/pages/rss.xml.ts: Dynamic RSS endpoint built from content.
  - src/pages/robots.txt.ts: Dynamic robots.txt pointing to sitemap-index.xml; sitemap is provided by @astrojs/sitemap integration.
  - src/pages/404.astro: Not-found page.
- Layout and global shell
  - src/layouts/Layout.astro: Shared shell; imports global styles (src/styles/global.css, typography.css), wraps Header and Footer, and offers an isWide prop to relax the max width when needed.
  - src/components/Head.astro: Common <head> tags, manifest/favicons, and <ClientRouter /> for Astro view transitions.
  - src/components/Header.astro and Footer.astro: Site chrome. Header composes navigation from src/constants.ts, includes a MobileMenu React island (client:load) and ThemeSwitch.
- Content model (Astro Content Collections)
  - src/content.config.ts defines two collections:
    - post: MD/MDX under src/content/posts with schema { title, description, date, image?, tags?, draft?, featured? }.
    - projects: MD/MDX under src/content/projects with schema { name, description, tags?, image, link, started?, finished? }.
  - Type-safe content is consumed via astro:content. Utility queries encapsulated in src/lib/data.ts (e.g., getAllPosts, getAdjacentPosts, getAllProjects, tag aggregation and grouping helpers).
- Components and UI
  - Astro components in src/components/* (Breadcrumbs, PostCard, Toc, etc.) compose styling and structure.
  - React UI primitives live in src/components/ui/* (TSX) built with Radix UI and class-variance-authority; imported into .astro files for server rendering or hydrated when needed.
  - Utilities in src/lib/utils.ts: cn class merging (clsx + tailwind-merge), date formatting, and a naive reading-time calculator used across components.
- Styling
  - Tailwind CSS v4 via the @tailwindcss/vite plugin configured in astro.config.mjs (vite.plugins). No tailwind.config.* file; global styles under src/styles/.
  - Expressive code blocks configured in astro.config.mjs: GitHub light/dark themes, collapsible sections, line numbers, KaTeX (rehype-katex), remark-emoji/remark-math/remark-sectionize, and external link hardening (rehype-external-links).
- Site metadata and navigation
  - src/constants.ts: website metadata (title, href, locale, pagination), navigation items, social links, and icon mapping. These are used by Header, PageHeading, RSS, etc.

Conventions and important details
- Path aliases: TypeScript paths map @/* to src/* (see tsconfig.json). Prefer alias imports for internal modules.
- Static generation: Site is configured without a server adapter; output is a static site (dist/). astro.config.mjs sets site to https://larayavrs.vercel.app for correct absolute URLs in sitemap/RSS.
- View transitions: <ClientRouter /> is enabled; avoid full document reload patterns in client code to preserve transitions.
- Images: Use astro:assets <Image> for post cover images and assets to benefit from built-time optimization.
- Pagination: Listing pagination size and “recent posts” count come from src/constants.ts (website.postsPerPage and website.howManyFeaturedPosts). Update these for global changes.

Gotchas and current mismatches
- Blog route naming: Pages and links are inconsistent between /post and /blog. The routes emitted by this repo are /post/... (from src/pages/post), while several components and utilities link to /blog (e.g., RSS items use /blog/${id}, breadcrumbs and index link to /blog). Future work should align these by either:
  - Renaming src/pages/post to src/pages/blog; or
  - Updating all links and generators to refer to /post.
  Until it’s resolved, internal links to /blog will 404 in a local build.
- Theme toggle is implemented via inline scripts in ThemeSwitch.astro using localStorage and DOM class toggling. When modifying it, ensure it plays well with Astro’s transitions and doesn’t regress on hydration timing.

How to add/edit content
- Posts: Add MD or MDX files under src/content/posts. Required frontmatter: title (string), description (string), date (coerced to Date). Optional: image, tags[], draft, featured.
- Projects: Add MD or MDX files under src/content/projects with fields defined in content.config.ts.
- After adding content, you can run yarn astro check to validate schemas and links.

Where things live
- astro.config.mjs: Integrations, markdown/rehype/remark settings, Tailwind plugin, and site URL.
- src/lib/data.ts: All post/project queries and tag grouping logic.
- src/components/*: Presentation components (Astro) and UI primitives (React) under src/components/ui.
- src/pages/*: Route definitions and endpoints (rss.xml.ts, robots.txt.ts).
- src/constants.ts: Site metadata, navigation, and social links.

Assistant rules and docs present in-repo
- No CLAUDE.md, Cursor rules, or Copilot instruction files were found.
- README.md is the Astro starter readme; the key command list there is already captured above.

