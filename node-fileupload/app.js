const express              = require("express");
const path                 = require("path");
const cookieParser         = require("cookie-parser");
const logger               = require("morgan");
const cors                 = require("cors");
const { responseEnhancer } = require("express-response-formatter");

const indexRouter = require("./routes/index.routes");
const fileRouter  = require("./routes/file.routes");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(responseEnhancer());

app.use("/", indexRouter);
app.use("/files", fileRouter);

// catch 404 and forward to error handler
/** catch 404 and forward to error handler */
app.use("*", (req, res) => {
  return res.formatter.notFound("Invalid path");
});

module.exports = app;
