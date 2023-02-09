const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const authRouter = require("./routes/auth");
const RestRouter = require("./routes/restaurant");
const CommRouter = require("./routes/community");
const { NotFoundError } = require("./utils/errors");
const security = require("./middleware/security")
const schoolRouter = require("./routes/schoolR")
const restrictionsRouter = require ("./routes/restriction")

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());

app.use(security.extractUserFromJwt);
app.use("/auth", authRouter);
app.use("/restaurant", RestRouter);
app.use("/community", CommRouter);
app.use("/schools", schoolRouter);
app.use("/restrictions", restrictionsRouter);


app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message;
  console.log(err.stack);
  return res.status(status).json({
    error: { message, status },
  });
});

app.route("/").get((req, res) => {
  res.send("Hello World!");
});



app.use((req, res, next) => {
  return next(new NotFoundError());
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`🚀 Server listening on port ` + port);
});


