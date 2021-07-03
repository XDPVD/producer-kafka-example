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
    dni: Number(dni),
    telephone: Number(telephone),
    email: email,
    reason: reason,
    comments: comments,
  };

  if (obj.reason === "ADUNI") {
    data.producer.send(
      [{ topic: "ADUNI", partition: 1, messages: JSON.stringify(obj) }],
      function (err, data) {}
    );
  } else {
    data.producer.send(
      [{ topic: "CVALLEJO", partition: 1, messages: JSON.stringify(obj) }],
      function (err, data) {}
    );
  }

  if (errors.length > 0) {
    res.render("formCrearMensaje", {
      errors,
      prevInfo: req.body,
    });
  } else {
    res.render("formCrearMensaje", {
      errors,
      prevInfo: req.body,
    });
  }
});

module.exports = router;
