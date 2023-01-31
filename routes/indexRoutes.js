const express=require("express")
const Router=express.Router()


Router.get("/", (req, res) =>{
  res.render("index");
  });

// Router.post("/", (req, res) =>{
//   const ame = new Name
//   ({
//   name: req.body.name,
//   });
//   ame.save();
//   res.send("got name");
//   });

  module.exports=Router;