import express from "express";
import cors from "cors";
import path from "path";
import compression from "compression";
import livereload from "livereload";
import connectLivereload from "connect-livereload";
import ejsMate from "ejs-mate";

import logger from "./config/utils/pino";
import { corsOptions } from "./config/utils/cors";

const app = express();
app.use(compression());
app.use(cors(corsOptions));
app.use(express.json());

const liveReloadServer = livereload.createServer({
  exts: ["ejs", "js", "css", "html"],
  port: 35729,
});
liveReloadServer.watch(path.join(__dirname, "./views"));
liveReloadServer.watch(path.join(__dirname, "../public"));

app.use(connectLivereload());

app.use(express.static(path.join(__dirname, "../public")));
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

app.get("/", (req, res) => {
  res.render("index", {
    mensaje: "Inicio EJS con TypeScript y Bun!",
    title: "Inicio",
  });
});
app.get("/contacto", (req, res) => {
  res.render("contacto", {
    mensaje: "Welcome to jurassic world",
    title: "Contacto",
  });
});
app.get("/servicios", (req, res) => {
  res.render("servicios", {
    mensaje: "Welcome to jurassic world a",
    title: "Lugares",
  });
});

app.use((req, res) => {
  res.status(404).render("404", {
    title: "Página no encontrada",
  });
});

liveReloadServer.server.on("change", () => {
  liveReloadServer.refresh("/");
});

app.listen(5115, () => {
  logger.info("Activo en http://localhost:5115");
});
