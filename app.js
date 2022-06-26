require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const app = express();

app.use(express.json());


const auth = require("./middleware/auth");

app.post("/welcome", auth, (req, res) => {
  res.status(200).send(" WELCOME !!! ");
});

const adminRouter = require('./routes/adminRoutes')
app.use('/admin', adminRouter)

const studentRouter = require('./routes/studentRoutes')
app.use('/student', studentRouter)

module.exports = app;