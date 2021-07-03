const express = require("express");

// Initializations
const app = express();
const router = require("./routes/solicitud");

const kafka = require("kafka-node");

require('dotenv').config();

console.log(process.env.KAFKA_HOST)

const client = new kafka.KafkaClient({ kafkaHost: process.env.KAFKA_HOST });

var producer = new kafka.Producer(client);

// Settings
app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3005);

// Middlewares

app.use(express.json());
app.use(express.urlencoded());

app.use(router);

app.use(express.static("public"));

// Global Variables

// Routes

// Static Files

// Server is listening
app.listen(app.get("port"), () => {
  console.log("Server on port ", app.get("port"));
});

exports.producer = producer;
