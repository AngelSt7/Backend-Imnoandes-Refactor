import * as fs from "fs";
import * as path from "path";

import { DISTRICT_SEED } from "../seed/data/district-data.seed";

const formatted = DISTRICT_SEED.map(d => ({
  ...d,
  slug: `${d.slug}-${d.province}-${d.department}`
}));

// Guardar como JSON bonito
fs.writeFileSync(
  path.join(process.cwd(), "districts_formatted.json"),
  JSON.stringify(formatted, null, 2), // `null, 2` = indentación bonita
  "utf-8"
);

console.log("Archivo exportado: districts_formatted.json");
