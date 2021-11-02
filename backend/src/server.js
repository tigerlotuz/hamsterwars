const express = require("express");
const cors = require("cors");
const app = express();
const hamstersRouter = require("./routes/hamsters.js");
const matchesRouter = require("./routes/matches.js");

const PORT = process.env.PORT || 1666;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.method}  ${req.url}`, req.body);
  next();
});

app.use("/img", express.static(__dirname + "/hamsters"));
app.use("/", express.static(__dirname + "/../public"));

app.use("/hamsters", hamstersRouter);
app.use("/", matchesRouter);

app.listen(PORT, () => {
  console.log(`The server is running on port: ${PORT}.`);
});