import express from 'express';
import { Router, Request, Response } from 'express';
import { Book } from '../schema/book';
import { z } from "zod"
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


const NewBook=z.object({
  title:z.string(),
  description:z.string(),
  pageCount:z.number()
})

router.post("/new", (req, res) => {
  let ParsedInput=NewBook.safeParse(req.body)
  if(!ParsedInput.success)
  {
    res.status(411).json({
      error:ParsedInput.error
    })
    return
  }
  try {
    const book = new Book({
      title: ParsedInput.data.title,
      description:ParsedInput.data.description,
      pageCount:ParsedInput.data.pageCount,
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
    if(dok)
    {
      dok.title = req.body.title,
      dok.description = req.body.description,
      dok.pageCount = req.body.pageCount
    await dok.save();
    res.redirect("/book")
    }
  


  }
  catch (e) {
    console.log(e);
  }
});

router.delete("/:id/delete", async (req, res) => {
  let bo = await Book.findById(req.params.id);
  if(bo)
  {
    try {
      await bo.remove();
      res.redirect("/book")
    } catch (e) {
      console.log(e);
    }
  }

});

export default  router;

