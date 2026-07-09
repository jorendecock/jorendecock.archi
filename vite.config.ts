import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { BASE_PATH } from "./src/base-path";

// Deze config vervangt de vroegere @lovable.dev/vite-tanstack-config wrapper
// door de "kale" TanStack Start / Vite opstelling. Functioneel verandert er
// niets aan de site zelf — enkel de Lovable-specifieke laag (o.a. de
// dev-only "component tagger" die de Lovable-editor nodig had) is weg.
//
// GEHOST OP GITHUB PAGES: GitHub Pages kan alleen statische bestanden
// serveren (geen server die bij elk bezoek code uitvoert). Daarom laten we
// TanStack Start hieronder elke pagina al TIJDENS het builden omzetten naar
// kant-en-klare HTML-bestanden ("prerender"). Na het laden neemt de router
// gewoon over voor snelle overgangen tussen pagina's, zoals een normale SPA.
export default defineConfig({
  base: BASE_PATH,
  server: {
    // host: true zorgt dat de dev server ook bereikbaar is buiten localhost
    // (handig in containers/CI). Pas de poort gerust aan naar wens.
    port: 8080,
    host: true,
  },
  resolve: {
    // voorkomt dubbele React/TanStack-instanties in de bundel
    dedupe: ["react", "react-dom", "@tanstack/react-router", "@tanstack/react-start"],
  },
  plugins: [
    tanstackStart({
      // Deze preset bepaalt hoe de (interne) SSR-server gebouwd wordt.
      // Voor GitHub Pages gebruiken we enkel de statisch geprerenderde
      // bestanden uit dist/client — dist/server wordt niet gedeployed,
      // dus de exacte preset hier is voor GitHub Pages niet cruciaal.
      // "node-server" is de meest neutrale/overdraagbare keuze.
      nitro: {
        preset: "node-server",
      },
      server: {
        // onze eigen SSR-foutafhandeling in src/server.ts blijft behouden
        // (pad is relatief t.o.v. de srcDirectory, dus geen "src/" ervoor)
        entry: "server",
      },
      // Prerendering: genereert voor elke pagina een echt .html-bestand,
      // zodat GitHub Pages (of eender welke statische host) alles kan
      // serveren zonder server. crawlLinks + autoStaticPathsDiscovery
      // zorgen dat ALLE paginas automatisch gevonden worden door vanaf
      // "/" alle links te volgen (dus ook elk project onder /projects/...).
      prerender: {
        enabled: true,
        crawlLinks: true,
        autoStaticPathsDiscovery: true,
        failOnError: true,
      },
    }),
    // react's vite-plugin moet ná start's vite-plugin komen
    viteReact(),
    tailwindcss(),
    tsConfigPaths(),
  ],
});
