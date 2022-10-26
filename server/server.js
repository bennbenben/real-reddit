import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import * as mongoose from "mongoose";
import cors from "cors";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from "./models/User.js";

// Jwebtoken secret
const secret = 'secret123';

// Dependencies usage
const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000',
  // origin: "https://real-reddit-client.onrender.com",
  credentials: true,
}));

// Constants
const PORT = 4000;
const HOST = "0.0.0.0";

// Connect to Database
let connectionString = "mongodb+srv://bobbest:wangweijie@generalassembly.imxw3.mongodb.net/?retryWrites=true&w=majority"
mongoose
.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "real_reddit",
})
.then(() => {
  console.log(`Mongoose Connected on Cloud!`);
})
.catch((err) => {
  console.log(err);
});

// Decode jwt
function getUserFromToken(token) {
    const userInfo = jwt.verify(token, secret);
    return User.findById(userInfo.id);
}


// API routes
app.get("/", (req, res) => {
  res.send("Hello World 👋");
});

// Register
app.post('/register', (req, res) => {
    const {email,username} = req.body;
    const password = bcrypt.hashSync(req.body.password, 10);
    const user = new User({email,username,password});
    user.save().then(user => {
      jwt.sign({id:user._id}, secret, (err, token) => {
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

// Get user upon pageload
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

// Logout
app.post('/logout', (req, res) => {
    res.cookie('token', '').send();
})

// Login
app.post('/login', (req, res) => {
    const {username, password} = req.body;
    User.findOne({username}).then(user => {
      if (user && user.username) {
        const passOk = bcrypt.compareSync(password, user.password);
        if (passOk) {
          jwt.sign({id:user._id}, secret, (err, token) => {
            res.cookie('token', token).send();
          });
        } else {
          res.status(422).json('Invalid username or password');
        }
      } else {
        res.status(422).json('Invalid username or password');
      }
    });
});

// Server running feedback messages
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

console.log(`Hello from the app 📦`);
