import express from "express";
import multer from "multer";
import xlsx from "xlsx";
import { readXlsxFile } from "read-excel-file/node";
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


export default router;
