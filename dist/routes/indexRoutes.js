"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get("/", (req, res) => {
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
exports.default = router;
