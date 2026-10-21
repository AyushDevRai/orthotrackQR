import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";

const root = resolve("out");
const port = Number(process.env.PORT || 3000);
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".json": "application/json", ".svg": "image/svg+xml", ".webp": "image/webp", ".png": "image/png", ".jpg": "image/jpeg", ".woff2": "font/woff2", ".woff": "font/woff", ".pdf": "application/pdf", ".mp4": "video/mp4", ".txt": "text/plain; charset=utf-8" };
try { await stat(resolve(root, "index.html")); } catch { console.error("Build the site first with npm run build."); process.exit(1); }
createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url || "/", "http://localhost").pathname);
    let file = resolve(root, "." + pathname);
    if (file !== root && !file.startsWith(root + sep)) { res.writeHead(403); res.end("Forbidden"); return; }
    if ((await stat(file)).isDirectory()) file = resolve(file, "index.html");
    const content = await readFile(file);
    res.writeHead(200, { "Content-Type": types[extname(file)] || "application/octet-stream", "X-Content-Type-Options": "nosniff" });
    res.end(req.method === "HEAD" ? undefined : content);
  } catch {
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    res.end(await readFile(resolve(root, "404.html")).catch(() => "Not found"));
  }
}).listen(port, "0.0.0.0", () => console.log(`Orthotrack production preview: http://localhost:${port}`));
