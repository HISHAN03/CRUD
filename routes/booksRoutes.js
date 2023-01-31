const express = require("express");
const book = require("../schema/book");
const Router = express.Router();
const Book = require("../schema/book");



Router.get("/", async (req, res) => {
  let search={}
  if(req.query.title !=null && req.query.title!='')
   search.title=new RegExp(req.query.title,"i")
  try {
    const books = await Book.find(search);
    res.render("books/index", { books: books, search : req.query });
  } catch (err) {
    res.status(500).send(err);
  }
});

Router.get("/new", async (req, res) => {
  res.render("books/new");
});
Router.post("/new", (req, res) => {
  try {
    const book = new Book({
      title: req.body.title,
      description: req.body.description,

      pageCount: req.body.pageCount,
    });
    book.save();
    res.redirect("/book")
    
  } catch (e) {
    console.log(e);
  }
});

Router.get("/:id/update", async (req, res) => {
  try {
    const books = await book.findById(req.params.id);
    res.render("books/update", { book: books });
  } catch (e) {
    console.log(e);
  }
});
Router.put("/:id/update", async (req, res) => {
  let dok;
  try {
     dok = await Book.findById(req.params.id);
      dok.title= req.body.title,
      dok.description= req.body.description,
      dok.pageCount= req.body.pageCount
      await dok.save();
    res.redirect("/book")
      
      
    }
     catch (e) {
    console.log(e);
  }});
  
  Router.delete("/:id/delete", async (req, res) => {
    let bo;
    try {
      bo = await book.findById(req.params.id);
      await bo.remove();
    res.redirect("/book")
      
    } catch (e) {
      console.log(e);
    }
  });

module.exports = Router;
