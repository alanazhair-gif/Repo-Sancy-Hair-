import { existsSync } from "node:fs";
import path from "node:path";

const ASSET_DIR = ["sites", "sancy"];

// Server-only: returns the public URL when the file exists under
// public/sites/sancy, otherwise null so the page shows a placeholder.
export function siteAsset(file: string) {
  const onDisk = path.join(process.cwd(), "public", ...ASSET_DIR, file);
  return existsSync(onDisk) ? `/${ASSET_DIR.join("/")}/${file}` : null;
}
