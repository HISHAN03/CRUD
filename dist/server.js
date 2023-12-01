"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const body_parser_1 = __importDefault(require("body-parser"));
//import Name from "./schema/name";
const mongoose_1 = __importDefault(require("mongoose"));
const method_override_1 = __importDefault(require("method-override"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const authorRoutes_1 = __importDefault(require("./routes/authorRoutes"));
const booksRoutes_1 = __importDefault(require("./routes/booksRoutes"));
const port = 3000;
mongoose_1.default
    .connect("mongodb+srv://hishan:1234@cluster0.sksy2nt.mongodb.net/?retryWrites=true&w=majority")
    .then(() => {
    console.log("Connected to MongoDB");
})
    .catch((err) => console.log(err));
// middleware
app.use((0, method_override_1.default)('_method'));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use("/", indexRoutes_1.default);
app.use("/authors", authorRoutes_1.default);
app.use("/book", booksRoutes_1.default);
app.listen(process.env.PORT || 7000, () => {
    console.log('app is live...');
});
