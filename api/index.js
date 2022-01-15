const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const db = require("./config/db");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const bcrypt = require("bcrypt");
const User = require("./models/User");
const Post = require("./models/Post");
const secret = "secret123";
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

//allow foreign apps to connect to our api e.g our React app
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

//Register new users 
app.post("/register", (req, res) => {
  const { email, username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const user = new User({ email, username, password: hashedPassword });
  user
    .save()
    .then((user) => {
      jwt.sign({ id: user.id }, secret, (err, token) => {
        if (err) {
          console.log(err);
          res.sendStatus(500);
        } else {
          res.status(201).cookie("token", token).send();
        }
      });
    })
    .catch((e) => {
      console.log(e);
      res.sendStatus(500);
    });
});

app.get("/user", (req, res) => {
  const token = req.cookies.token;
  //console.log(token)
  if (!token) {
    return;
  }
  jwt.verify(token, secret, (err, user) => {
    // console.log(user)

    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    User.findByPk(user.id)
      .then((user) => {
        res.json({ username: user.username });
      })
      .catch((e) => {
        console.log(e);
        res.sendStatus(500);
      });
  });
});

app.post("/logout", (req, res) => {
  return        res.clearCookie("token");
 
  // res.cookie('token','').send()
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  User.findOne({ where: { username } })
    .then((user) => {
      if (!user) {
        res.status(404).json("Invalid Username or Password");
      }
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) console.log(err);

        if (isMatch) {
          res.cookie("token", token).send();
        } else {
          res.status(403).json("Invalid Username or Password");
        }
      });
    })
    .catch((e) => {
      console.log(e);
    });
});

app.get("/posts", (req, res) => {
  Post.findAll({
    where: { rootId: null },
    order: [["createdAt", "DESC"]],
  }).then((posts) => {
    res.json(posts);
  });
});

app.post("/posts", (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    res.sendStatus(401);
    return;
  }
  jwt.verify(token, secret, (err, user) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }
    User.findByPk(user.id)
      .then((user) => {
        const { title, body, parentId, rootId } = req.body;
        const post = new Post({
          title,
          body,
          author: user.username,
          parentId,
          rootId,
        });
        post.save().then((post) => {
          res.json(post);
        });
      })
      .catch((e) => {
        console.log(e);
        res.sendStatus(500);
      });
  });
});

//get all comments
app.get("/comments/root/:rootId", (req, res) => {
  Post.findAll({ where: { rootId: req.params.rootId } }).then((comments) => {
    res.json(comments);
  });
});

app.get("/posts/:id", (req, res) => {
  Post.findByPk(req.params.id).then((post) => {
    res.json(post);
  });
});

async function DB() {
  try {
    await db.authenticate();
    console.log("Database Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
DB();

//start the server
app.listen(3000, () => {
  console.log("Server Started");
});
