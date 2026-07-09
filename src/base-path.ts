// ============================================================
//  BASISPAD VOOR GITHUB PAGES
// ============================================================
//
//  GitHub Pages plaatst een gewoon repository-project meestal op:
//     https://<gebruikersnaam>.github.io/<repo-naam>/
//  dus de site draait dan in een SUBMAP, niet op de root van het domein.
//  Daarom moet zowel Vite (voor de bestandspaden van CSS/JS) als de
//  router (voor de URL's zoals /info en /projects/...) weten in welke
//  submap de site staat.
//
//  WAT MOET JIJ AANPASSEN?
//  ------------------------------------------------------------
//  Vervang "REPO-NAAM" hieronder door de exacte naam van je GitHub
//  repository (hoofdlettergevoelig!). Heet je repo bijvoorbeeld
//  "jorendecock-website", dan wordt dit "/jorendecock-website/".
//
//  UITZONDERING — eigen (sub)domein of *.github.io als repo-naam:
//  Als je repo exact "<gebruikersnaam>.github.io" heet (een
//  gebruikers/organisatie-site), OF als je een eigen domeinnaam koppelt
//  via een CNAME-bestand, dan draait de site WEL op de root. Zet dit
//  dan gewoon op "/".
// ============================================================

export const BASE_PATH = "/https://jorendecock.github.io/jorendecock.archi/";
