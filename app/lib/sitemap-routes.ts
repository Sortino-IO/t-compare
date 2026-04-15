import fs from "fs";
import path from "path";

/** Directories under `app/` that never contain public pages. */
const SKIP_APP_CHILD_DIRS = new Set(["components", "data", "lib"]);

export type StaticSitemapPath = {
  /** URL path: "" for home, "/about" for about, etc. */
  pathname: string;
  lastModified: Date;
};

/**
 * Derives static routes from all app router page files so new pages are included
 * in the sitemap without maintaining a manual list.
 *
 * Skips dynamic route segments; those URLs are added from data (blog posts, brands).
 */
export function discoverStaticAppRoutes(
  appDir = path.join(process.cwd(), "app"),
): StaticSitemapPath[] {
  const pageFiles: { relUnix: string; full: string }[] = [];

  function walk(currentDir: string): void {
    let entries: fs.Dirent[];
    try {
      entries = fs.readdirSync(currentDir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const ent of entries) {
      const name = ent.name;
      if (name.startsWith(".") || name.startsWith("_")) continue;

      const full = path.join(currentDir, name);
      if (ent.isDirectory()) {
        if (currentDir === appDir && SKIP_APP_CHILD_DIRS.has(name)) continue;
        walk(full);
      } else if (/^page\.(tsx|ts|jsx|js|mjs|cjs)$/.test(name)) {
        const rel = path.relative(appDir, full);
        const relUnix = rel.split(path.sep).join("/");
        pageFiles.push({ relUnix, full });
      }
    }
  }

  walk(appDir);

  const seen = new Set<string>();
  const out: StaticSitemapPath[] = [];

  for (const { relUnix, full } of pageFiles) {
    const pathname = filePathToUrlPathname(relUnix);
    if (pathname === null) continue;
    if (seen.has(pathname)) continue;
    seen.add(pathname);

    let lastModified = new Date();
    try {
      lastModified = fs.statSync(full).mtime;
    } catch {
      /* keep default */
    }
    out.push({ pathname, lastModified });
  }

  return out.sort((a, b) => a.pathname.localeCompare(b.pathname));
}

function filePathToUrlPathname(relUnix: string): string | null {
  const dir = path.posix.dirname(relUnix);
  if (dir === ".") {
    return "";
  }

  const segments = dir.split("/").filter(Boolean);
  if (segments.some((s) => /^\[[^\]]+\]$/.test(s))) {
    return null;
  }

  const urlSegments = segments.filter((s) => !/^\([^)]+\)$/.test(s));
  if (urlSegments.some((s) => /^\[[^\]]+\]$/.test(s))) {
    return null;
  }

  return urlSegments.length ? `/${urlSegments.join("/")}` : "";
}
