  if (process.env.NODE_ENV !== 'production') 
  {require('dotenv').config()}

  import express from "express";
  const app = express();
  import bodyParser from "body-parser";

  //import Name from "./schema/name";
  import mongoose from "mongoose";
  import methodOverride from 'method-override';
  import indexRoute from "./routes/indexRoutes";
  import authorRoute from "./routes/authorRoutes";
  import bookRoute from "./routes/booksRoutes";

  const port: number = 3000;
  mongoose
    .connect("mongodb+srv://hishan:1234@cluster0.sksy2nt.mongodb.net/?retryWrites=true&w=majority")
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => console.log(err));


  // middleware
  app.use(methodOverride('_method'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.set("view engine", "ejs");

  app.use("/", indexRoute)
  app.use("/authors", authorRoute)
  app.use("/book", bookRoute)

  app.listen(process.env.PORT || 7000,()=>
  {
    console.log('app is live...')
  })

