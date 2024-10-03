const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Set up express
const app = express();

// Set up express middleware
app.use(express.json());
app.use("/", router);

// Set up port data
port = 5000;

// Set up test GET endpoint
app.use("/api/views", require("./router/view.router"));

router.get("/api/test", function (req, res) {
  return res.send(`Get Hello World!`);
});

// Set up test POST endpoint
router.post("/api/test", function (req, res) {
  return res.send(`Post Hello World!`);
});

app.use((req, res, next) => {
  return res.send(`Error 404: Not found!`);
});

// Set up mongodb functions
const connectToMongoDb = async () => {
  try {
    const connectionString = process.env["DB_CONNECTION_STRING"];
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log(`Error connecting to MongoDB ${error}`);
  }
};

mongoose.connection
  .once("open", () => {
    console.log("MongoDB connected successfully!");
  })
  .on("error", (error) => {
    console.log(`Error connecting to MongoDB ${error}`);
  });

connectToMongoDb();

// Launch app
app.listen(port, () => {
  console.log(`Example app listening at ${port}.`);
});

// Export app
module.exports = app;
