const express = require("express");
const path = require("path");
const authRoutes = require("./routes/auth");

const app = express();

// Définir le dossier public pour les fichiers statiques (CSS, images, etc.)
app.use(express.static(path.join(__dirname, "public")));
app.use("/", authRoutes);

// Définir EJS comme moteur de rendu
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // S'assurer que Express trouve les fichiers EJS

// Démarrage du serveur
app.listen(8080, () => {
  console.log("Server running on http://localhost:8080");
});
