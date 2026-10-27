# SteerLine website

The bilingual SteerLine product site and learning hub. The confirmed architecture is documented in [docs/website-architecture.md](docs/website-architecture.md).

## Development

Use Node.js 22 or newer. Install dependencies with `npm install`, start the local server with `npm run dev`, and run `npm run build` to type-check and generate the static site in `dist/`. `npm run preview` serves the production build locally.

The default entry redirects to `/en/`; Chinese pages are under `/zh-cn/`. The homepage is custom Astro, while the articles use Starlight. The GitHub Actions workflow builds on pull requests and pushes to `main`.

## Deployment

The static site is deployed to the `steerline` Cloudflare Pages project at `https://steerline.dev`. After authenticating with Wrangler, build with `npm ci` and `npm run build`, then deploy with `npx wrangler pages deploy dist --project-name steerline --branch main`. This is a direct upload; the GitHub workflow currently checks builds but does not deploy automatically.

## Content

Articles live in `src/content/docs/<locale>/`. Write and review Chinese first, then translate and review English. Corresponding pages share a `contentId` in frontmatter. The initial-content script is a historical bootstrap helper; edit the Markdown pages directly afterwards.

Each article records `contentId`, `translationStatus`, and `updated`. Update `translationStatus` to `needs-sync` when its translation is stale and restore `current` after review; stale pages display a notice. Document applicable product versions and verification dates for operational instructions.

The language switcher matches content by ID and indicates when the other language is unavailable. The content check requires every English page to have a Chinese source, preventing Starlight's default-language fallback from silently serving English as Chinese. Chinese-only pages may be published while their English translations are in progress.
