const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(cors());

app.post("/test", (req, res) => {
  let email = req.body.email;
  if (!email) {
    res.status(500).send({ response: "Please fill out email" });
  } else {
    res.status(201).send({ response: "Email Saved ..." });
  }
});

PORT = 9000;

app.listen(PORT, () => console.log(`Server is running on ${PORT} ...`));
