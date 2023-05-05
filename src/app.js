const express = require("express");
const morgan = require("morgan");
const app = express();
const port = 8806;

const sanatci = require("./router/sanatcilarRoutes");
const calmalistesi = require("./router/calmaListesiRoutes");

app.use(express.json());
app.use(morgan("dev")); // logging every request to console with path and status code

async function getUsers() {
  const fetch = require("node-fetch");
  let x = await fetch("https://randomuser.me/api/");
  let y = await x.json();
  return y;
}

app.get("/", async (req, res) => {
  let user = await getUsers();
  res.status(200).json(user);
});

app.listen(port, () => {
  console.log(`Example app listening at ${port}`);
  app.use("/sanatcilar", sanatci);
  app.use("/calmalistesi", calmalistesi);
});

module.exports = app;
