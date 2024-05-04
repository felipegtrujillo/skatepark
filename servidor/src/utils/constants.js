const jwt = require("jsonwebtoken");
const secretKey = "Pedro Pablo Pérez Pereira, pobre pintor portugués, pinta preciosos paisajes por poca plata, para poder pasar por París.";
const tokenOptions = { expiresIn: "600s" }; // 10 minutes
const tokenName = "jwtToken";

module.exports = { jwt, secretKey, tokenOptions, tokenName };
