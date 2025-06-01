const { spawnSync } = Bun;
import { mkdirSync, readdirSync, statSync, copyFileSync } from "fs";
import { join } from "path";
import logger from "./src/config/utils/pino";

// Ejecutar el build
logger.info("📦 Compilando código TypeScript...");
const build = spawnSync([
  "bun",
  "build",
  "src/server.ts",
  "--outdir",
  "dist",
  "--target",
  "bun",
]);
if (build.exitCode !== 0) {
  logger.error("❌ Error durante el build");
  process.exit(1);
}

// Función recursiva para copiar una carpeta
function copiarCarpeta(origen: string, destino: string) {
  mkdirSync(destino, { recursive: true });
  const items = readdirSync(origen);
  for (const item of items) {
    const origenPath = join(origen, item);
    const destinoPath = join(destino, item);
    const stats = statSync(origenPath);
    if (stats.isDirectory()) {
      copiarCarpeta(origenPath, destinoPath);
    } else {
      copyFileSync(origenPath, destinoPath);
    }
  }
}

// Copiar la carpeta public al dist
logger.info("📂 Copiando carpeta public...");
copiarCarpeta("public", "dist/public");

logger.info("✅ Build completo con carpeta public copiada");
