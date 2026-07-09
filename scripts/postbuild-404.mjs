// Na het builden kopieert dit script de gerenderde startpagina naar
// dist/client/404.html. Dit is de standaardtruc voor SPA's op GitHub Pages:
// browsers vragen bij een onbekende URL automatisch 404.html op, en omdat
// die dezelfde app bevat, herkent onze router de foute URL zelf en toont
// hij netjes de bestaande "pagina niet gevonden"-component (zie NotFound()
// in src/site.tsx) — zonder dat we die pagina apart moeten bijhouden.
import { copyFile } from "node:fs/promises";
import { existsSync } from "node:fs";

const from = "dist/client/index.html";
const to = "dist/client/404.html";

if (!existsSync(from)) {
  console.error(`[postbuild] ${from} niet gevonden — sla 404.html-stap over.`);
  process.exit(0);
}

await copyFile(from, to);
console.log(`[postbuild] ${to} aangemaakt (kopie van ${from}).`);
