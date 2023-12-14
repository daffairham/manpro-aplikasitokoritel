import express from "express";
import multer from "multer";
import xlsx from "xlsx";

// components
import { Header } from "../components/header/index.js";
import { Navigation } from "../components/navigation-bar/index.js";
import { Layout } from "../components/layout/index.js";
import { Head } from "../components/head/index.js";
import pool from "../db.js";

const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Uploads will be stored in the 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Set a unique filename
  },
});

const upload = multer({ storage: storage });
// route halaman landing
router.get("/", (req, res) => {
  res.render("landing/index", {
    Head: Head("../css/output.css", "../js/cosmetic.js", "Landing"),
    Header: Header.landing,
  });
});

// route halaman upload
router.get("/upload-csv", (req, res) => {
  res.render("upload-csv/index", {
    Head: Head("../css/output.css", "../js/cosmetic.js", "Upload CSV"),
    Header: Header.global,
    Path: "upload-csv",
    Navigation: Navigation.global,
    Layout: Layout.global("upload-csv"),
  });
});

router.post("/upload", upload.single("upload"), (req, res) => {
    if (!req.file) {
        return res.status(400).send('kosong');
      }
    
      //nanti disini handling kayak buat baca file .csv, terus masukkin ke database.
      res.send('File uploaded!');
      console.log(req.file)
});

// route halaman grafik bar
router.get("/graph-bar", (req, res) => {
  res.render("graph-bar/index", {
    Head: Head("../css/output.css", "../js/cosmetic.js", "Grafik Bar"),
    Header: Header.global,
    Path: "graph-bar",
    Navigation: Navigation.global,
    Layout: Layout.graphBar,
  });
});

// route halaman scatter plot
router.get("/scatter-plot", (req, res) => {
  res.render("scatter-plot/", {
    Head: Head("../css/output.css", "../js/cosmetic.js", "Scatter Plot"),
    Header: Header.global,
    Path: "scatter-plot",
    Navigation: Navigation.global,
    Layout: Layout.graphBar,
  });
});

router.get('/summary', (req, res) => {
    const query = 'SELECT Education, COUNT(*) AS CountFish FROM Customer GROUP BY Education';
    pool.query(query, (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });
export default router;
