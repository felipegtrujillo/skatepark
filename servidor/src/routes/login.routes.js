const { Router } = require("express");
const router = Router(); 

const {
  getUser,
  getAdmin
} = require("../controllers/login.controllers.js");

/* post => CONSULTA para validar login usuario/skater */
router.post("/usuario", getUser);

/* post => CONSULTA para validar login admin */
router.post("/admin", getAdmin);

module.exports = router;
