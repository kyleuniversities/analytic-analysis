const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const viewSchema = new Schema(
  {
    url: { type: String },
    time: { type: String },
  },
  { timestamps: true },
);

const View = mongoose.model("view", viewSchema);
module.exports = View;
