import { existsSync } from "node:fs";
import { join } from "node:path";

export function hasResumeFile(href: string): boolean {
  const relativePath = href.startsWith("/") ? href.slice(1) : href;
  return existsSync(join(process.cwd(), "public", relativePath));
}
