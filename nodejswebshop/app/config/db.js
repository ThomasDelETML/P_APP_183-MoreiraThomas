const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost:8080",
  user: "root",
  password: "root",
  database: "evropa_heritage",
});

db.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à MySQL:", err);
    return;
  }
  console.log("Connecté à MySQL !");
});

module.exports = db;
