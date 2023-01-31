if (process.env.NODE_ENV !== 'production') 
{require('dotenv').config()}

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Name = require("./schema/name");
const mongoose = require("mongoose");
const methodOverride = require('method-override');
const indexRoute=require("./routes/indexRoutes")
const authorRoute=require("./routes/authorRoutes")
const bookRoute=require("./routes/booksRoutes")
port=3000;

mongoose
  .connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3001,console.log("connected to mongo db")))
  .catch((err) => console.log(err));

// middleware
app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use("/", indexRoute)
app.use("/authors", authorRoute)
app.use("/book", bookRoute)

app.listen(process.env.PORT || port)

