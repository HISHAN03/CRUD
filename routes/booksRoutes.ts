import express from 'express';
import { Router, Request, Response } from 'express';
import { Book } from '../schema/book';

const router: Router = express.Router();

//const Book = require('../schema/book') as Book;

router.get("/", async (req:Request, res:Response) => {
  let search: { title?: RegExp } = {};

  if (typeof req.query.title === 'string' && req.query.title !== '') {
    search.title = new RegExp(req.query.title, "i");
  } else if (Array.isArray(req.query.title) && req.query.title.length > 0) {
    const joinedTitles = req.query.title.join(' ');
    search.title = new RegExp(joinedTitles, "i");

  }
  try {
    const books = await Book.find(search);
    res.render("books/index", { books: books, search: req.query });
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/new", async (req, res) => {
  res.render("books/new");
});
router.post("/new", (req, res) => {
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

router.get("/:id/update", async (req, res) => {
  try {
    const books = await Book.findById(req.params.id);
    res.render("books/update", { book: books });
  } catch (e) {
    console.log(e);
  }
});
router.put("/:id/update", async (req, res) => {
  let dok;
  try {
    dok = await Book.findById(req.params.id);
    dok.title = req.body.title,
      dok.description = req.body.description,
      dok.pageCount = req.body.pageCount
    await dok.save();
    res.redirect("/book")


  }
  catch (e) {
    console.log(e);
  }
});

router.delete("/:id/delete", async (req, res) => {
  
  try {
    let bo = await Book.findById(req.params.id);
    await bo.remove();
    res.redirect("/book")

  } catch (e) {
    console.log(e);
  }
});

export default  Router;

