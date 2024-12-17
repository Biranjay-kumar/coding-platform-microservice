const express = require("express");
const bodyParser = require("body-parser");

const { PORT } = require("./config/server.config");
const apiRouter = require("./routes");
const {errorHandler} = require("./utils");
const connectToDb = require("./config/db.config");
require("dotenv").config();
const app = express();

// connectToDb();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

app.use("/api",apiRouter)

app.get("/ping", (req, res) => {
  return res.json({
   message:"Problem Service is alive"
  })
});



app.use(errorHandler)

app.listen(PORT, async() => {
  console.log(`server is running on port ${PORT}`)
  
  await connectToDb();

});
