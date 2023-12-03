import express, { Router,Request,Response} from 'express';

const router: Router = express.Router();


router.get("/", (req:Request, res:Response) =>{
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

export default router;