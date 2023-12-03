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
const Router = express_1.default.Router();
const name_1 = require("../schema/name");
const zod_1 = require("zod");
Router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let searchOptions = {};
    if (typeof req.query.name === 'string' && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i');
    }
    else if (Array.isArray(req.query.name) && req.query.name.length > 0) {
        const joinedNames = req.query.name.join(' ');
        searchOptions.name = new RegExp(joinedNames, 'i');
    }
    try {
        const resources = yield name_1.Name.find(searchOptions);
        res.render('authors/resources', {
            resources: resources,
            searchOptions: req.query
        });
    }
    catch (_a) {
        res.redirect('/');
    }
}));
// Router.get("/", async (req, res) => {
//   try {
//     const resources = await Name.find({});
//     res.render("authors/resources", { resources: resources });
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });
Router.get("/add", (req, res) => {
    res.render("authors/add");
});
Router.post("/add", (req, res) => {
    const inputNameProps = zod_1.z.object({
        name: zod_1.z.string().min(3)
    });
    const parsedName = inputNameProps.safeParse(req.body);
    if (!parsedName.success) {
        res.status(411).json({
            error: parsedName.error
        });
        return;
    }
    let newName = parsedName.data.name;
    const name = new name_1.Name({
        name: newName,
    });
    name.save();
    res.redirect("/authors");
});
Router.get("/:id/update", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = yield name_1.Name.findById(req.params.id);
        res.render("authors/update", { name: name });
    }
    catch (e) {
        console.log(e);
    }
}));
Router.put("/:id/update", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let Nname;
    try {
        Nname = yield name_1.Name.findById(req.params.id);
        if (Nname) {
            Nname.name = req.body.name;
            console.log(Nname);
            yield Nname.save();
            res.redirect("/authors");
        }
        else {
            console.log("no name");
        }
    }
    catch (e) {
        console.log(e);
    }
}));
Router.delete("/:id/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let Nname;
    try {
        Nname = yield name_1.Name.findById(req.params.id);
        if (Nname) {
            yield Nname.remove();
            res.redirect("/authors");
        }
    }
    catch (e) {
        console.log(e);
    }
}));
exports.default = Router;
