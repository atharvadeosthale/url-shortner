import mongoose from "mongoose";

const UrlSchema = new mongoose.Schema({
  link: String,
  code: String,
});

const UrlModel = mongoose.model("urls", UrlSchema, "urls");

export default UrlModel;
