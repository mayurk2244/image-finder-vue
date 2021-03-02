const express = require("express");
const app = new express();
// const axios = require("axios");
// const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY || "";
const port = process.env.port || 8080;
// const API_URL = "https://pixabay.com/api/";

//Get File details
app.listen(port);

app.get("/images", (req, res) => {
  let req_parameter = req.query;

  console.log(req_parameter);
  res.json(req_parameter);
});

console.log(`App Started on ${port}`);
