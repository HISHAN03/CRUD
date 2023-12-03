"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_1 = require("../schema/book");
const zod_1 = require("zod");
const router = express_1.default.Router();
//const Book = require('../schema/book') as Book;
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let search = {};
    if (typeof req.query.title === 'string' && req.query.title !== '') {
        search.title = new RegExp(req.query.title, "i");
    }
    else if (Array.isArray(req.query.title) && req.query.title.length > 0) {
        const joinedTitles = req.query.title.join(' ');
        search.title = new RegExp(joinedTitles, "i");
    }
    try {
        const books = yield book_1.Book.find(search);
        res.render("books/index", { books: books, search: req.query });
    }
    catch (err) {
        res.status(500).send(err);
    }
}));
router.get("/new", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("books/new");
}));
const NewBook = zod_1.z.object({
    title: zod_1.z.string(),
    description: zod_1.z.string(),
    pageCount: zod_1.z.number()
});
router.post("/new", (req, res) => {
    let ParsedInput = NewBook.safeParse(req.body);
    if (!ParsedInput.success) {
        res.status(411).json({
            error: ParsedInput.error
        });
        return;
    }
    try {
        const book = new book_1.Book({
            title: ParsedInput.data.title,
            description: ParsedInput.data.description,
            pageCount: ParsedInput.data.pageCount,
        });
        book.save();
        res.redirect("/book");
    }
    catch (e) {
        console.log(e);
    }
});
router.get("/:id/update", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield book_1.Book.findById(req.params.id);
        res.render("books/update", { book: books });
    }
    catch (e) {
        console.log(e);
    }
}));
router.put("/:id/update", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let dok;
    try {
        dok = yield book_1.Book.findById(req.params.id);
        if (dok) {
            dok.title = req.body.title,
                dok.description = req.body.description,
                dok.pageCount = req.body.pageCount;
            yield dok.save();
            res.redirect("/book");
        }
    }
    catch (e) {
        console.log(e);
    }
}));
router.delete("/:id/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let bo = yield book_1.Book.findById(req.params.id);
    if (bo) {
        try {
            yield bo.remove();
            res.redirect("/book");
        }
        catch (e) {
            console.log(e);
        }
    }
}));
exports.default = router;
