const express = require("express");
require("dotenv").config();

const cors = require("cors");
const jsonwebtoken = require("jsonwebtoken");

const sendMail = require("./sendMail.js");
const app = express();

let passGenerat = null;
let usernameGlobal = null;
let emailGlobal = null;

app.use(cors());
app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log(`server running at ${process.env.PORT} port`);
});

const authentication = (request, response, next) => {
  let jwtToken;
  const authHeader = request.headers["authorization"];

  if (authHeader !== undefined) {
    jwtToken = authHeader.split(" ")[1];
  }
  if (authHeader === undefined) {
    response.status(407);
    response.send({ msg: "Inavlid user" });
  } else {
    jsonwebtoken.verify(jwtToken, "my-secret-token", async (error, payload) => {
      if (error) {
        response.status(401);
        response.send({ msg: "invalid jwt token" });
      } else {
        request.username = payload.username;
        next();
      }
    });
  }
};

app.get("/api/testing", async (req, res) => {
  res.send("hey jahnu ms nw");
});

app.post("/api/login", async (req, res) => {
  const { email } = req.body;

  passGenerat = Math.ceil(Math.random() * 100001);

  //   console.log(passGenerat, "login");
  usernameGlobal = email;
  //   console.log(req.body);
  const sub = "Login OTP from SWIGGY";
  const tex = ` Hi,
       ${passGenerat} is your SWIGGY verification OTP. Please do not
        share it with anyone.
        
        Team SWIGGY`;

  sendMail(email, sub, tex);

  res.send({ msg: "password sent to email" });
});

app.post("/api/verify", (req, res) => {
  const { otp } = req.body;
  //   console.log(otp, "otp");
  //   console.log(passGenerat, "generated");
  if (passGenerat == otp) {
    const payload = { username: usernameGlobal };
    // res.status(200);
    const token = jsonwebtoken.sign(payload, "my-secret-token");
    res.send({ token });
  } else {
    res.status(400);
    res.send({ msg: "Invalid password" });
  }
});

app.get("/api/profile", authentication, async (req, res) => {
  let { username } = req;

  res.send(username);
});
