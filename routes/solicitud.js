const express = require("express");
const router = express.Router();

const data = require("../index");

router.get("/contacto", (req, res) => {
  res.render("formCrearMensaje", { errors: [] });
});

router.post("/contacto/", (req, res) => {
  console.log("SUBMIT");
  const { firstName, lastName, dni, telephone, email, reason, comments } =
    req.body;

  const errors = [];

  obj = {
    firstName: firstName,
    lastName: lastName,
    dni: dni,
    telephone: telephone,
    email: email,
    reason: reason,
    comments: comments,
  };

  if (obj.reason === "aduni") {
    data.producer.send(
      [{ topic: "aduni", partition: 1, messages: JSON.stringify(obj) }],
      function (err, data) {}
    );
  } else {
    data.producer.send(
      [{ topic: "cvallejo", partition: 0, messages: JSON.stringify(obj) }],
      function (err, data) {}
    );
  }

  if (firstName === undefined || firstName === "") {
    errors.push({ text: "Por favor, escriba su nombres" });
  }

  if (lastName === undefined || lastName === "") {
    errors.push({ text: "Por favor, escriba su nombres" });
  }

  console.log(errors);
  if (errors.length > 0) {
    res.render("formCrearMensaje", {
      errors,
      prevInfo: req.body,
    });
  } else {
    res.send("Solicitud Enviada");
  }
});

module.exports = router;
