const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/User");

const cookieParser = require("cookie-parser");
app.use(cookieParser());

// appel createTable.js pour la connection et création de la table t_Users (l'activer juste si la table n'est pas créé)
// require("./db/createTable");

app.set("view engine", "ejs");

// indique que on a un dossier public dont on utilisera pour mettre les css/images
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

// charge uniquement userRoutes sous "/"
app.use("/", userRoutes);

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
