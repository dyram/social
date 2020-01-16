module.exports = app => {
  const users = require("../models").Users;
  const passwordHash = require("password-hash");
  const jwt = require("jsonwebtoken");
  const key = require("../config/key.json");

  const Posts = require("../controllers/postController");

  app.get("/", (req, res) => {
    res.send("Working Fine!!");
  });

  app.post("/login", (req, res) => {
    let data = req.body;
    users
      .findAll({
        attributes: ["id", "name", "pass"],
        where: { name: data.name }
      })
      .then(prom => {
        console.log(prom);
        let val = passwordHash.verify(data.pass, prom[0].pass);
        console.log("valid ===> ", val);
        var token;
        if (val) {
          token = {
            id: jwt.sign({ id: prom[0].id }, key.tokenKey),
            validity: true
          };
        } else {
          token = {
            id: jwt.sign({ id: prom[0].id }, key.tokenKey),
            validity: false
          };
        }
        res.send(token);
      });
  });

  app.post("/signup", (req, res) => {
    let data = req.body.pass;
    let hash = passwordHash.generate(data);
    users.create({
      name: req.body.name,
      pass: hash
    });
  });

  app.post("/timeline", (req, res) => {
    Posts.getPosts().then(resp => {
      res.send(resp);
    });
  });

  app.post("/timelineadd", (req, res) => {
    let id = req.body.uid;
    let decodedData = jwt.verify(id, key.tokenKey);
    let resp = Posts.addPosts(decodedData.id, req.body.text, req.body.image);
    res.send(resp);
  });
};
