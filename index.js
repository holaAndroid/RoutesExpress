//index.js
// endpoint /api/act
// endpoint /api/act/:id"  http://localhost:3000/api/act/1
// el joi solo en el post y el put

const express = require("express");
const app = express();
const Joi = require("joi");
const helmet = require("helmet");
const morgan = require("morgan");
const port = 5000;

app.use(express.json());

app.use(helmet());
app.use(morgan("combined"));

const rutasCursos = require("./routes/rutas-cursos"); //Importación de
//rutas
app.use("", rutasCursos);
//app.use("api/cursos", rutasCursos);

const rutasDocentes = require("./routes/rutas-docentes"); //Importación de rutas
app.use("", rutasDocentes);
//app.use("api/docentes", rutasDocentes);

app.listen(port, () => {
  console.log(`Servidor escuchando en puerto ${port}`);
});
