import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

import todoRoutes from "./apps/TodoApp/routes.js";

const app = express();
const host = "http://localhost";
const port = 8042;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// static folder for serving public files
app.use(express.static(path.join(__dirname, "public")));

// body parser middleware
app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// set view engine to ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/todos", todoRoutes);

// handle 404 errors
app.use((req, res) => {
    res.status(404).render("404", {
        title: "404 - Page Not Found",
        text: "The page you are looking for does not exist.",
    });
});

app.listen(port, () => {
    console.log(`Server is running at ${host}:${port}`);
});
