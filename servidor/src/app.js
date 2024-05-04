const express = require("express");
const fileUpload = require('express-fileupload');
const cors = require("cors");
const routes = require("./routes/index.routes"); //<=todas las rutas

const app = express();

// Middleware para procesar formularios
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public/uploads")); 

/* ------MIDDLEWARES---------------------------------------------------------- */
/* middleware para aceptar jsons */
app.use(express.json());
/* ----------------------CORS----------------------------------------- */
app.use(fileUpload());
/* Para aceptar peticiones */
app.use(cors());
/* -----------------------RUTAS------------- */
/* Para los endpoints */
app.use("", routes); 

module.exports =  app;
