const express = require("express");
const app = express();
const db = require("./DataBase/DbConnect");
const Router = require("./Routes");
var cors = require("cors");

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use("/", Router);

db();
app.listen(5000, () => {
  console.log("Server running at port no. 5000");
});
