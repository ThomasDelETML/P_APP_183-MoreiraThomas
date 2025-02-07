module.exports = {
  checkUser: (req, res) => {
    console.log("Utilisateur identifié");
  },
  get: (req, res) => {
    const page = req.path === "/register" ? "register" : "login";
    res.render(page, { name: "Thomas" });
  },
};
