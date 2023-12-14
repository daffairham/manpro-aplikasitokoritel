process.env.NODE_ENV = 'development';

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

// Your routes come after Multer configuration
app.use("/upload", routes);
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(routes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Internal Server Error');
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});