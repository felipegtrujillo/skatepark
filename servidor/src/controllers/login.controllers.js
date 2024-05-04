const { pool } = require("../db");

const {
  jwt,
  secretKey,
  tokenOptions,
  tokenName,
} = require("../utils/constants.js");

/* GET BY SMTHNG => CONSULTAR POR ALGUN PARAMETRO EN PARTICULAR */
const getUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const selectedUser = {
      email,
      password,
    };

    const values = [email, password];
    let query = "SELECT * FROM skaters WHERE email = $1 AND password = $2";

    const result = await pool.query(query, values);

    console.log("result", result);

    if (result.rowCount !== 0) {
      const token = jwt.sign(selectedUser, secretKey, tokenOptions);

      res.status(200).json({
        status: "ok",
        is_Active: true,
        message: "Usuario logueado",
        token: token,
        tokenName:
          tokenName /* para guardarlo en session storage y luego rescatarlo con el mismo nombre en la peticion */,
        resultado: result.rows[0],
      });
    } else {
      res.status(401).json({
        status: "login invalido",
        message:
          "El usuario y/o la contraseña no son correctos. Vuelve a intentarlo",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(400).send("Error ingresar");
  }
};

/* GET BY SMTHNG => CONSULTAR POR ALGUN PARAMETRO EN PARTICULAR */
/* GET => CONSULTAR */
const getAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const selectedUser = {
      email,
      password,
    };

    const values = [email, password];
    let query = "SELECT * FROM admin WHERE email = $1 AND password = $2";

    const result = await pool.query(query, values);

    console.log("result", result);

    if (result.rowCount !== 0) {
      const token = jwt.sign(selectedUser, secretKey, tokenOptions);

      res.status(200).json({
        status: "ok",
        is_Active: true,
        message: "Admin logueado",
        token: token,
        tokenName:
          tokenName /* para guardarlo en session storage y luego rescatarlo con el mismo nombre en la peticion */,
        resultado: result.rows[0],
      });
    } else {
      res.status(401).json({
        status: "login invalido",
        message:
          "El usuario y/o la contraseña no son correctos. Vuelve a intentarlo",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(400).send("Error ingresar");
  }
};

module.exports = {
  getUser,
  getAdmin,
};
