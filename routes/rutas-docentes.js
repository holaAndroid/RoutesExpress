// rutas-docentes
const Joi = require("joi");
const express = require("express");
const { joiPasswordExtendCore } = require("joi-password");
const joiPassword = Joi.extend(joiPasswordExtendCore);

const router = express.Router();
const docentes = [
  {
    id: 1,
    nombre: "Francisco",
    apellidos: "Deniz Medina",
    email: "adf@adf.com",
    password: "45213",
  },
];

router.get("/docentes", (req, res) => {
  res.send(docentes);
});

router.get("/api/docente/:id", (req, res) => {
  let idDocente = parseInt(req.params.id);
  const elDocente = docentes.find((docente) => {
    return docente.id === idDocente;
  });
  if (!elDocente) {
    res.status(404);
    res.send("No hemos encontrado el usuario con ese id");
  } else {
    res.status(200).send(elDocente);
  }
});

router.post("/api/cursos/", (req, res) => {
  const schema = Joi.object({
    nombre: Joi.string().min(3).max(15).required(),
    apellidos: Joi.string().min(5).required(),
    email: Joi.string().required(),
    password: joiPassword
      .string()
      .minOfSpecialCharacters(1)
      .minOfLowercase(1)
      .minOfUppercase(1)
      .minOfNumeric(1)
      .noWhiteSpaces()
      .required(),
  });
  const validacion = schema.validate(req.body);
  console.log(validacion);
  if (validacion.error) {
    res.status(404).send(validacion.error.details[0].message);
    return;
  }

  const nuevoDocente = {
    id: docentes.length + 1,
    nombre: req.body.nombre,
    apellidos: req.body.apellidos,
    email: req.body.email,
    password: req.body.password,
  };

  docentes.push(nuevoDocente);
  res.status(200).send(docentes);
});

router.put("/:id", (req, res) => {
  let idDocente = parseInt(req.params.id);
  const elDocente = docentes.find((docente) => {
    return docente.id === idDocente;
  });
  const schema2 = Joi.object({
    nombre: Joi.string().min(3).max(15).required(),
    apellidos: Joi.string().min(5).required(),
    email: Joi.string(),
    password: joiPassword
      .string()
      .minOfSpecialCharacters(1)
      .minOfLowercase(1)
      .minOfUppercase(1)
      .minOfNumeric(1)
      .noWhiteSpaces()
      .required(),
  });
  const validacion2 = schema2.validate(req.body);
  console.log(validacion2);
  if (validacion2.error) {
    res.status(404).send(validacion2.error.details[0].message);
    return;
  }
  if (!elDocente) {
    res.status(404).send("No encontrado");
  } else {
    // Actualizamos los datos del DOCENTE !
    (elDocente.nombre = req.body.nombre),
      (elDocente.apellidos = req.body.apellidos),
      (elDocente.email = req.body.email),
      (elDocente.password = req.body.password);

    res.status(200).send(docentes);
  }
});

router.delete("/:id", (req, res) => {
  let idDocente = parseInt(req.params.id);
  const elDocente = docentes.find((docente) => {
    return docente.id === idDocente;
  });
  if (!elDocente) {
    res.status(404).send("Usuario no encontrado");
  } else {
    const eliminar = docentes.indexOf(elDocente);
    docentes.splice(eliminar, 1);
    res.status(200).send("Usuario eliminado");
  }
});
module.exports = router; // Sintaxis para exportar las rutas creadas
