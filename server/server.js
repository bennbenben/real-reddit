'use strict';
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose, { mongo } from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "./models/User.js";
import Comment from "./models/Comment.js";

// Constants
const PORT = 8080;
const HOST = "0.0.0.0";
dotenv.config({ path: "./.env" });

// App
const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(
  cors({
    origin: ["https://real-reddit-client.onrender.com", "http://localhost:3000"],
    credentials: true,
  })
);

await mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "real_reddit",
}).then(() => {
  console.log(`Mongoose Connected`);
}).catch((err) => {
  console.log(err);
});

app.get("/", (req, res) => {
  res.send("Hello World 👋");
});

app.post("/register", (req, res) => {
  const { email, username } = req.body;
  const password = bcrypt.hashSync(req.body.password, 10);
  const user = new User({email, username, password});
  user.save().then(user => {
    jwt.sign({id:user._id}, process.env.secret, (err, token) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.status(201).cookie('token', token).send();
      }
    });
  }).catch(e => {
    console.log(e);
    res.sendStatus(500);
  });
});

const getUserFromToken = (token) => {
  const userInfo = jwt.verify(token, process.env.secret);
  return User.findById(userInfo.id);
}

app.get('/user', (req, res) => {
  const token = req.cookies.token;
  getUserFromToken(token)
    .then(user => {
      res.json({username:user.username});
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

app.post('/login', (req, res) => {
  const {username, password} = req.body;
  User.findOne({username}).then(user => {
    if (user && user.username) {
      const passOk = bcrypt.compareSync(password, user.password);
      if (passOk) {
        jwt.sign({id:user._id}, process.env.secret, (err, token) => {
          res.cookie('token', token).send();
        });
      } else {
        res.status(422).json("Invalid username or password");
      }
    } else {
      res.status(422).json("Invalid username or password");
    }
  });
});

app.post('/logout', (req, res) => {
  res.cookie('token','').send();
});

app.get('/comments', (req, res) => {
  const search = req.query.search;
  const filters = search
    ? {body: {$regex: '.*'+search+'.*'}}
    : {rootId:null};
  Comment.find(filters).sort({postedAt: -1}).then(comments => {
    res.json(comments);
  });
});

app.get('/comments/root/:rootId', (req, res) => {
  Comment.find({rootId:req.params.rootId}).sort({postedAt: -1}).then(comments => {
    res.json(comments);
  });
});

app.get('/comments/:id', (req, res) => {
  Comment.findById(req.params.id).then(comment => {
    res.json(comment);
  });
});

app.post('/comments', (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    res.sendStatus(401);
    return;
  }
  getUserFromToken(token)
    .then(userInfo => {
      const {title, body, parentId, rootId} = req.body;
      const comment = new Comment({
        title,
        body,
        author:userInfo.username,
        postedAt:new Date(),
        parentId,
        rootId,
      });
      comment.save().then(savedComment => {
        res.json(savedComment);
      }).catch(console.log)
    })
    .catch(() => {
      res.sendStatus(401);
    })
  
})

// Health Check
app.get("/health-check", (req, res) => {
  res.send('Server is healthy');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

console.log(`Hello from the app 📦`);