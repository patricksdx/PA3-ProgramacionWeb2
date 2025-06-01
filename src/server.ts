import express from "express";
import cors from "cors";
import path from "path";
import compression from "compression";

import logger from "./config/utils/pino";
import { corsOptions } from "./config/utils/cors";

const app = express();
app.use(compression());
app.use(cors(corsOptions));
app.use(express.json());

app.use(express.static(path.join(__dirname, "../public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

app.get("/", (req, res) => {
  res.render("index", { mensaje: "Hola desde EJS con TypeScript y Bun!" });
});
app.get("/contact", (req, res) => {
  res.render("contact", { mensaje: "Contacto con ejs con bun" });
});

app.listen(5115, () => {
  logger.info("Activo en http://localhost:5115");
});
