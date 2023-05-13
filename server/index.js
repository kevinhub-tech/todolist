const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const app = express();

//use express.json() to get data into json format
app.use(express.json());

//PORT declaration
const PORT = process.env.PORT || 5500;

//Connecting to mongodb
mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => console.log("Database is Connected!"))
  .catch((err) => console.log(err));

//importing our router
const TodoItemRoute = require("./routes/todoitems");

//Using our routes
app.use("/", TodoItemRoute);

//Add port and connecting to server
app.listen(PORT, () => {
  console.log("Server is Connected...");
});
