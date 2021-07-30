var   express              = require("express");
var   path                 = require("path");
var   cookieParser         = require("cookie-parser");
var   logger               = require("morgan");
const { responseEnhancer } = require("express-response-formatter");

var indexRouter = require("./routes/index");
var urlRouter   = require("./routes/url");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(responseEnhancer());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/url", urlRouter);

/** catch 404 and forward to error handler */
app.use("*", (req, res) => {
  return res.formatter.notFound("Invalid path");
});

module.exports = app;
