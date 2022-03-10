import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import config from "./config/index.js";
import { DBConnect } from "./database/index.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import ejs from "ejs";
import { userRoute } from "./routes/index.js";
import { restaurantRoute } from "./routes/index.js";
const app = express();
DBConnect();

app.use(express.json());
app.use(cors());
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));

app.engine("html", ejs.renderFile);
app.set("view engine", "html");

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.use("/user", userRoute);
app.use("/restaurant", restaurantRoute);

app.listen(config.PORT, () => {
  console.log(`app is listening on port ${config.PORT}`);
});
