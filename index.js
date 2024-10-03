const express = require("express");
const router = express.Router();

// Set up express
const app = express();

// Set up express middleware
app.use(express.json());
app.use("/", router);

// Set up port data
port = 5000;

// Set up test GET endpoint
router.get("/api/test", function (req, res) {
  return res.send(`Get Hello World!`);
});

// Set up test POST endpoint
router.post("/api/test", function (req, res) {
  return res.send(`Post Hello World!`);
});

// Launch app
app.listen(port, () => {
  console.log(`Example app listening at ${port}.`);
});

// Export app
module.exports = app;
