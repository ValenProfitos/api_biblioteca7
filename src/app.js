const express = require("express");

require("dotenv").config();

const { auth } = require("express-oauth2-jwt-bearer");
const errorHandler = require("./middlewares/errorHandler");


// Configuracion Middleware con el Servidor de Autorización 
const autenticacion = auth({
  secret: process.env.OAUTH_SECRET,
  audience: process.env.OAUTH_AUDIENCE,
  issuerBaseURL: process.env.OAUTH_URL,
  tokenSigningAlg: process.env.OAUTH_TKNSINGIN,
});


const app = express();
app.use(express.json());

// Importamos el Router de Libros
const librosRouter = require("./routes/libros");

//Configuramos el middleware de autenticacion
app.use("/api/libros", autenticacion,  librosRouter);

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Servidor iniciado en el puerto 3000");
});

module.exports = app;