const express = require("express");
const app = express();
const hamstersRouter = require("./routes/hamsters.js");

const PORT = process.env.PORT || 1666;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.method}  ${req.url}`, req.body);
  next();
});

app.use("/hamsters", hamstersRouter);

app.listen(PORT, () => {
  console.log(`The server is running on port: ${PORT}.`);
});
