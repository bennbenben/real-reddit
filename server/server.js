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

app.get('/user', (req, res) => {
  const token = req.cookies.token;
  // console.log({token});
  const userInfo = jwt.verify(token, process.env.secret)
    User.findById(userInfo.id)
      .then(user => {
        res.json({username:user.username});
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      })
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

// Health Check
app.get("/health-check", (req, res) => {
  res.send('Server is healthy');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

console.log(`Hello from the app 📦`);