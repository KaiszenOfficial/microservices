const express              = require('express');
const cookieParser         = require('cookie-parser');
const logger               = require('morgan');
const cors                 = require("cors");
const { responseEnhancer } = require("express-response-formatter");

const indexRouter = require('./routes/index');
const authRouter  = require("./routes/auth");
const usersRouter = require('./routes/users');

const app = express();

app.use(cors())
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(responseEnhancer());

app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/users", usersRouter);

module.exports = app;
