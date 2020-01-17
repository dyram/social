module.exports = app => {
  const users = require("../models").Users;
  const passwordHash = require("password-hash");
  const jwt = require("jsonwebtoken");
  const key = require("../config/key.json");

  const Posts = require("../controllers/postController");
  const Comments = require("../controllers/commentController");

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

  app.post("/commentadd", (req, res) => {
    let pid = req.body.pid;
    let uid = jwt.verify(req.body.uid, key.tokenKey).id;
    let text = req.body.text;
    let resp = Comments.addComments(pid, uid, text);
    res.send(resp);
  });

  app.post("/comments", (req, res) => {
    Comments.getComments().then(resp => {
      res.send(resp);
    });
  });

  app.post("/getuser", (req, res) => {
    let uid = jwt.verify(req.body.id, key.tokenKey).id;
    users
      .findAll({
        attributes: ["name"],
        where: { id: uid }
      })
      .then(prom => {
        res.send(prom);
      });
  });

  app.post("/deletecomment", (req, res) => {
    let pid = req.body.pid;
    let uid = req.body.uid;
    let text = req.body.text;
    Comments.deleteComments(pid, uid, text);
    Comments.getComments().then(resp => {
      res.send(resp);
    });
  });
};
