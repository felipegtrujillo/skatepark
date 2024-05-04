const { pool } = require("../db");
const path = require("path");

/* GET => CONSULTAR */
const obtener = async (req, res) => {
  try {
    const datosToken = req.usuario;
    const { email, password } = req.usuario;

    console.log("datos token", datosToken);

    const values = [email, password];

    const query = "SELECT * FROM skaters where email = $1 AND password = $2;";

    let result = await pool.query(query, values);

    return res.status(200).json({ status: "ok", result: result.rows });
  } catch (error) {
    console.error(error);
    return res.status(400).send("Error buscando los productos");
  }
};

/* GET BY SMTHNG => CONSULTAR POR ALGUN PARAMETRO EN PARTICULAR */
const obtenerAll = async (req, res) => {
  try {
    let query = "SELECT * FROM skaters";

    const result = await pool.query(query);

    return res.status(200).json({ status: "ok", result: result.rows });
  } catch (error) {
    console.error(error);
    return res.status(400).send("Error buscando los productos");
  }
};

/* POST => CREAR */
const registrar = async (req, res) => {
  try {
    const { email, nombre, password, years, esp } = req.body;

    console.log("valores", email, nombre, password, years, esp);

    // Verifica si se ha subido un archivo
    if (!req.files || !req.files.foto) {
      return res.status(400).send("Debe subir una foto");
    }

    const foto = req.files.foto;

    console.log("foto", foto);

    const ruta = path.join(__dirname, "..", "..");

    let date = new Date();
    let time = date.getTime();
    let newFileName = `${time + "-" + foto.name}`;

    const fotoPath = `${ruta}/public/uploads/${newFileName}`; // Ruta donde se guardará la foto

    // Guardar el archivo en el servidor

    foto.mv(fotoPath, async (err) => {
      if (err) {
        console.log("EEROR EN FOTO");
        console.error(err);
        return res.status(500).send(err);
      }

      const fotobdd = `http://localhost:3030/${newFileName}`;

      const values = [email, nombre, password, years, esp, fotobdd, false];

      const query =
        "INSERT INTO skaters (email, nombre, password, anos_experiencia, especialidad, foto, estado) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *";

      const result = await pool.query(query, values);

      return res.status(200).json({ status: "ok", result: result.rowCount });
    });
  } catch (error) {
    console.error(error);
    console.log(error);
    return res.status(400).send("Error registrando el usuario");
  }
};

/* PATCH O PUT => EDITAR */
const modificar = async (req, res) => {
  try {
    const { id, email, nombre, password, years, especialidad } = req.body;

    const values = [id, email, nombre, password, years, especialidad];

    console.log("valores", id, email, nombre, password, years, especialidad);

    let query =
      "UPDATE skaters SET email = $2, nombre = $3, password = $4, anos_experiencia = $5, especialidad = $6 WHERE id = $1 RETURNING *";

    const result = await pool.query(query, values);

    console.log("result", result);

    if (result.rowCount !== 0) {
      return res.status(200).json({ status: "ok", result: result.rows });
    } else {
      return res
        .status(200)
        .json({ status: "no existe registro", result: result.rows });
    }
  } catch (error) {
    console.error(error);
    res.status(400).send("Error al actualizar registro");
  }
};

/* PATCH O PUT => EDITAR */
const modificarEstado = async (req, res) => {
  await pool.query("BEGIN");
  try {
    const valores = req.body;

    console.log("valores", valores);

    for (const { id, estado } of valores.array) {
      const values = [id, estado];
      const query = "UPDATE skaters SET estado = $2 WHERE id = $1 RETURNING *";
      const result = await pool.query(query, values);

      // Verificar si se actualizó correctamente
      if (result.rowCount === 0) {
        throw new Error(`No se encontró un skater con ID ${id}`);
      }
    }
    // Commit de la transacción si todas las actualizaciones fueron exitosas
    await pool.query("COMMIT");
    console.log("Actualización exitosa para todos los skaters.");

    return res
      .status(200)
      .json({ status: "ok", mensaje: "Actualización exitosa " });
  } catch (error) {
    console.error(error);
    await pool.query("ROLL BACK");
    return res.status(400).send("Error al actualizar registros");
  }
};

/* DELETE => ELIMINAR */
const eliminar = async (req, res) => {
  try {
    const { id } = req.query;

    console.log("entra a eliminar ");

    const values = [id];
    console.log("values", values);
    let query = "DELETE FROM skaters WHERE id = $1 RETURNING *";

    const result = await pool.query(query, values);

    if (result.rowCount !== 0) {
      return res.status(200).json({ status: "ok", result: result.rows });
    } else {
      return res
        .status(200)
        .json({ status: "no existe registro", result: result.rows });
    }
  } catch (error) {
    console.error(error);
    res.status(400).send("Error buscando los productos");
  }
};

module.exports = {
  registrar,
  modificar,
  modificarEstado,
  obtener,
  obtenerAll,
  eliminar,
};
