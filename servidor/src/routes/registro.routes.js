const { Router } = require("express");
const router = Router(); 
const {
  registrar,
  modificar,
  modificarEstado,
  obtener,
  obtenerAll,
  eliminar
} = require("../controllers/registro.controllers.js");

const { verificarToken } = require("../middleware/jwt.js");

/* GET => Obtener todos los registros en base a email y password*/
router.get("/", verificarToken, obtener);

/* GET => Obtener todos los registros */
router.get("/public", obtenerAll);

/* POST => Crear un nuevo registro */
router.post("/usuario",  registrar);

/* PUT => Actualizar un registro existente */
router.put("/", verificarToken, modificar);

/* PUT => Actualizar el estado de registro existente, solo por el administador */
router.put("/admin", verificarToken, modificarEstado);

/* DELETE => Eliminar un registro */
router.delete("/",verificarToken,  eliminar);

module.exports = router;