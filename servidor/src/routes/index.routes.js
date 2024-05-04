const { Router } = require("express");
const router = Router();
const login = require("./login.routes.js");
const registro = require("./registro.Routes.js");

/* GET DE EJEMPLO  localhost:3000/   */
router.get("/", (req, res) => {
});

/*definimos los endpoints en secciones */
router.use("/login", login);
router.use("/registro", registro);

router.get("*", (req, res) => {
  res.send("<h1> Esta Página no exíste <h1>");
});


module.exports = router;
