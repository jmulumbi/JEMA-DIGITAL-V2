# SEO overhaul and favicon fix for jemadigital.netlify.app

This PR makes the site crawlable, improves social previews, fixes the favicon, and removes a package that caused a peer dependency conflict with React 19.

Summary of changes

Files added
- public/_redirects — ensures Netlify serves index.html for all routes (single-line: "/*    /index.html   200").
- public/sitemap.xml — lists the app's primary routes for search engines.
- public/robots.txt — allows crawling and points to the sitemap.
- src/hooks/useDocumentMeta.ts — small hook to set document title and meta tags without react-helmet-async.

Files modified
- index.html — updated favicon link to `/jema-digital-logo-hexagon-jd.svg` and added Open Graph & Twitter meta tags.
- src/main.tsx — removed HelmetProvider and wrapped app with BrowserRouter.
- src/App.tsx — removed import/usages of react-helmet-async's <Helmet> and replaced with useDocumentMeta calls in each page component.
- package.json — removed react-helmet-async to avoid peer dependency conflicts with React 19.

Why these changes
- react-helmet-async had a peer dependency that excluded React 19, causing `npm install` to fail on Netlify (
  ERESOLVE errors).
- The site only used Helmet for page titles and basic meta tags, so a small in-repo hook provides the same functionality while staying compatible with React 19.

Testing notes
- After merging, run locally:
  - rm -rf node_modules package-lock.json
  - npm install
  - npm run build
- Clear Netlify build cache before triggering a new deploy so Netlify picks up the new package-lock.json.

If anything fails during npm install or build, paste the logs here and I will fix the minimal issues required to get a successful build.
