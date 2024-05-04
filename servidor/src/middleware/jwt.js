const {
    jwt,
    secretKey,
    tokenOptions,
    tokenName,
  } = require("../utils/constants.js");


const verificarToken = (req, res, next) => {
  const token = req.headers['authorization'];

  console.log("token es"), token;

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token inválido' });
    }

    req.usuario = decoded;

    next();
  });
};

  
  module.exports = {
    verificarToken
  };
  