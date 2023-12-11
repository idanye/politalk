import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { fileURLToPath } from "url";
import { dirname } from "path";
// import "./config/database.js";
import router from "./routes.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PORT = process.env.PORT || 3000;

const app = express();

//MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname))

//ROUTES
app.use('/', router);

app.get("/privacy-policy", (req, res) => {
    res.sendFile("./public/privacy-policy.html", { root: __dirname });
});

app.get("/", (req, res) => {
    res.send("Server is running 🌐");
});

app.listen(PORT, () => {
    console.log("Server running on port ${PORT} 🌐");
});