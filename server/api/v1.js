import express from "express";
import cors from "cors";
import Url from "../models/Url.js";

const router = express.Router();
router.use(cors());
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

var baseServerUrl = "http://localhost:5000";

router.post("/create", async (req, res) => {
  try {
    if (!req.body.link || !req.body.code) {
      return res
        .status(400)
        .json({ status: false, message: "All fields are required!" });
    }
    const { link, code } = req.body;
    const obj = await Url.findOne({ code });
    if (obj) {
      return res.status(400).json({
        status: false,
        message: "Code already taken, please choose another code!",
      });
    }
    const newObj = new Url({ link, code });
    await newObj.save();
    return res.json({
      status: true,
      message: "URL shortened successfully",
      link,
      code,
      shortened: baseServerUrl + "/l/" + code,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
});

export default router;
