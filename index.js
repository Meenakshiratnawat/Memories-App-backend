require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const postroutes = require("./routes/posts.js");

app.use(bodyParser.json({limit:"30mb",extended:true})); 
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());

app.use("/posts", postroutes);



//mogodb to connect to mongoose server and create database connection 
const connectionUrl = `mongodb+srv://mahisingh8561:memory123@cluster0.eytnshz.mongodb.net/`

const PORT = 4000

mongoose
  .connect(
     "mongodb+srv://mahisingh8561:memory123@cluster0.eytnshz.mongodb.net/",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((e) => {
    console.error("Connection error", e.message);
  });
