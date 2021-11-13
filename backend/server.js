const express = require("express");
const cors = require("cors");
const app = express();
const hamstersRouter = require("./routes/hamsters.js");
const matchesRouter = require("./routes/matches.js");
const matchWinnersRouter = require("./routes/matchwinner");
const winnersRouter = require("./routes/winners");
const losersRouter = require("./routes/losers");

const PORT = process.env.PORT || 1666;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.method}  ${req.url}`, req.body);
  next();
});

app.use("/img", express.static(__dirname + "/hamsters"));
app.use("/", express.static(__dirname + "/../build"));

app.use("/hamsters", hamstersRouter);
app.use("/matches", matchesRouter);
app.use("/matchWinners", matchWinnersRouter);
app.use("/winners", winnersRouter);
app.use("/losers", losersRouter);

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(PORT, () => {
  console.log(`The server is running on port: ${PORT}.`);
});
