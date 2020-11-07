import express from "express";
import cors from "cors";
import v1 from "./api/v1.js";
import linkapi from "./api/link.js";
import db from "./connections/db.js";

const PORT = 5000;

// Initialize express app
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", v1);
app.use("/l", linkapi);

app.listen(PORT, () => console.log("Server running on " + PORT));
