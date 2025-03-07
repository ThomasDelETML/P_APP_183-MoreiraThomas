const crypto = require("crypto");
const db = require("../db/connectionDb");

const generateSessionToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

module.exports = {
  loginUser: (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    const sql = "SELECT id, hash, sel FROM t_Users WHERE username = ?";

    db.query(sql, [username], (err, results) => {
      if (err) {
        console.error("Erreur lors de la recherche de l'utilisateur :", err);
        return res.status(500).json({ message: "Erreur serveur" });
      }

      if (results.length === 0) {
        return res.status(401).json({ message: "Utilisateur non trouvé" });
      }

      const { id, hash, sel } = results[0];

      // Recalculer le hash avec le sel stocké
      const hashedPassword = crypto
        .createHash("sha256")
        .update(password + sel)
        .digest("hex");

      if (hashedPassword !== hash) {
        return res.status(401).json({ message: "Mot de passe incorrect" });
      }

      // Générer un token de session sécurisé
      const sessionToken = generateSessionToken();

      // Stocker le token dans un cookie HTTP-only (sécurisé)
      res.cookie("webshop", sessionToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // Expire dans 7 jours
      });

      res.render("postLogin", { username });
    });
  },

  logoutUser: (req, res) => {
    const sessionToken = req.cookies.session_token;
    if (!sessionToken) {
      return res.redirect("/login");
    }

    // Supprimer le cookie
    res.clearCookie("webshop");
    res.redirect("/login");
  },

  checkAuth: (req, res, next) => {
    const sessionToken = req.cookies.session_token;

    if (!sessionToken) {
      return res.redirect("/login");
    }
  },
};
