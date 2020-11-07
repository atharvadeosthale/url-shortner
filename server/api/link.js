import express from "express";
import Url from "../models/Url.js";

const router = express.Router();

router.get("/:code", async (req, res) => {
  try {
    const code = req.params.code;
    const obj = await Url.findOne({ code });
    if (!obj) {
      return res.redirect("http://localhost:3000");
    }
    return res.redirect(obj.link);
  } catch (err) {
    console.error(err);
    res.redirect("http://localhost:3000");
  }
});

export default router;
