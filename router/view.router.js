/**
 * Router used for View related services
 */
require("dotenv").config();
const express = require("express");
const router = express.Router();
const View = require("../models/view.model");
const { setUpRouterMiddleware, throwError } = require("../util/router-util");

// Set up router middleware
setUpRouterMiddleware(router);

/**
 * User API Routes
 */
// CREATE Method
// Create a view
router.post(`/`, async (req, res) => {
  try {
    const url = `${req.body.url}`;
    const time = new Date(
      new Date().getTime() - 7 * 60 * 60 * 1000,
    ).toISOString();
    const view = new View({ url, time });
    await view.save();
    return res.send(view);
  } catch (error) {
    return throwError(req, res, error);
  }
});

// READ Method
// Gets all views
router.get(`/`, async (req, res) => {
  try {
    console.log(req.query);
    if (
      !req.query.passToken ||
      req.query.passToken != process.env["PASS_TOKEN"]
    ) {
      return res.send(`Error 404: Not found!`);
    }
    const views = await View.find({});
    const viewMap = {};
    for (let view of views) {
      const timeText = view.time;
      const url = view.url;
      const key = timeText.substring(0, 10);
      const bucket = viewMap[key] || [];
      bucket.push({ url, time: timeText });
      viewMap[key] = bucket;
    }
    return res.send(viewMap);
  } catch (error) {
    return throwError(req, res, error);
  }
});

// Export routes
module.exports = router;
