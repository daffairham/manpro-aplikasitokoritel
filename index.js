import express from "express";
import routes from "./controller/routes.js";
import multer from "multer";

const app = express();
const port = 3000;

// Multer Configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });
  
  const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 *1024 }, 
  });

// Use Multer Middleware
app.use(upload.single("uploadfile")); // Use the correct field name used in the form

// Your routes come after Multer configuration
app.use("/upload", routes);
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(routes);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});