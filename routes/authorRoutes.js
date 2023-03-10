const express = require("express");
const Router = express.Router();
const Name = require("../schema/name");


Router.get('/', async (req, res) => {
  let searchOptions = {}
  if (req.query.name != null && req.query.name !== '') {
    searchOptions.name = new RegExp(req.query.name, 'i')
  }
  try {
    const resources = await Name.find(searchOptions)
    res.render('authors/resources', {
      resources: resources,
      searchOptions: req.query
    })
  } catch {
    res.redirect('/')
  }
})

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
  const name = new Name({
    name: req.body.name,
  });
  name.save();
  res.redirect("/authors")
});

Router.get("/:id/update", async (req, res) => {
  try {
    const name = await Name.findById(req.params.id);
    res.render("authors/update", { name: name });
  } catch (e) {
    console.log(e);
  }
});

Router.put("/:id/update", async (req, res) => {
  let Nname;
  try {
    Nname = await Name.findById(req.params.id);
    Nname.name = req.body.name;
    console.log(Nname);
    await Nname.save();
    res.redirect("/authors")
  } catch (e) {
    console.log(e);
  }
});

Router.delete("/:id/delete", async (req, res) => {
  let Nname;
  try {
    Nname = await Name.findById(req.params.id);
    await Nname.remove();
    res.redirect("/authors")
  } catch (e) {
    console.log(e);
  }
});
module.exports = Router;
