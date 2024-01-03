import express from "express";
import multer from "multer";
import readXlsxFile from "read-excel-file/node";
import path from "path";
import xlsx from "xlsx";
import { fileURLToPath } from "url";
import { dirname } from "path";
import csv from "csv-parser";
import fs from "fs";
// components
import { Header } from "../components/header/index.js";
import { Navigation } from "../components/navigation-bar/index.js";
import { Layout } from "../components/layout/index.js";
import { Head } from "../components/head/index.js";
import pool from "../db.js";
import he from "he";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
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

router.post("/upload", upload.single("uploadfile"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  // console.log(req.file); // Log file information

  // Get the current module's file path
  const __filename = fileURLToPath(import.meta.url);
  // Get the directory path
  const __dirname = dirname(__filename);

  const filePath = path.resolve("public", "uploads", req.file.filename);
  importCSVData2MySQL(filePath)
    .then(() => {
      console.log("berhasil");
      res.redirect("/upload-csv");
    })
    .catch((error) => {
      console.error("Error importing data:", error);
      res
        .status(500)
        .send("Maaf, saat ini masih belum bisa T-T, sudah 80% kok!");
    });
});

//FUNGSI PARSING FILE
async function importCSVData2MySQL(filePath) {
  try {
    const rows = [];

    // Read CSV file and push rows to the array
    await new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv({ separator: ";" }))
        .on("data", (row) => {
          rows.push(row);
          // console.log("Parsed Row:", row);
        })
        .on("end", resolve)
        .on("error", reject);
    });

    // console.log("Rows:", rows);

    const peopleData = [];
    const productsData = [];
    const promotionData = [];
    const placeData = [];

    rows.forEach((row) => {
      const peopleRow = [
        parseInt(row.Year_Birth) || null,
        row.Education,
        row.Marital_Status,
        parseInt(row.Income) || null,
        parseInt(row.Kidhome) || null,
        parseInt(row.Teenhome) || null,
        row.Dt_Customer,
        parseInt(row.Recency) || null,
        parseInt(row.Complain) || null,
      ];

      const productsRow = [
        parseInt(row.MntWines) || null,
        parseInt(row.MntFruits) || null,
        parseInt(row.MntMeatProducts) || null,
        parseInt(row.MntFishProducts) || null,
        parseInt(row.MntSweetProducts) || null,
        parseInt(row.MntGoldProds) || null,
      ];
      const promotionRow = [
        parseInt(row.NumDealsPurchases) || null,
        parseInt(row.AcceptedCmp1) || null,
        parseInt(row.AcceptedCmp2) || null,
        parseInt(row.AcceptedCmp3) || null,
        parseInt(row.AcceptedCmp4) || null,
        parseInt(row.AcceptedCmp5) || null,
        parseInt(row.Response) || null,
      ];
      const placeRow = [
        parseInt(row.NumWebPurchases) || null,
        parseInt(row.NumCatalogPurchases) || null,
        parseInt(row.NumStorePurchases) || null,
        parseInt(row.NumWebVisitsMonth) || null,
      ];

      peopleData.push(peopleRow);
      productsData.push(productsRow);
      promotionData.push(promotionRow);
      placeData.push(placeRow);
    });

    // Log the data before insertion
    // console.log("People Data:", peopleData);
    // console.log("Products Data:", productsData);
    // console.log("Promotion Data:", promotionData);
    // console.log("Place Data:", placeData);
    console.log("ini coba", peopleData[0]);

    // Define queries
    const queries = [
      {
        query:
          "INSERT INTO people (Year_Birth, Education, Marital_Status, Income, Kidhome, Teenhome, Dt_Customer, Recency, Complain) VALUES ?",
        data: peopleData,
      },
      {
        query:
          "INSERT INTO products (MntWines, MntFruits, MntMeatProducts, MntFishProducts, MntSweetProducts, MntGoldProds) VALUES ?",
        data: productsData,
      },
      {
        query:
          "INSERT INTO promotion (NumDealsPurchases, AcceptedCmp1, AcceptedCmp2, AcceptedCmp3, AcceptedCmp4, AcceptedCmp5, Response) VALUES ?",
        data: promotionData,
      },
      {
        query:
          "INSERT INTO place (NumWebPurchases, NumCatalogPurchases, NumStorePurchases, NumWebVisitsMonth) VALUES ?",
        data: placeData,
      },
    ];

    // Execute queries using Promise.all
    await Promise.all(queries.map((queryObject) => executeQuery(queryObject)));

    console.log("Data inserted into the database successfully");
    return "Data inserted into the database successfully";
  } catch (error) {
    console.error("Error importing data:", error);
    throw error;
  }
}

function executeQuery({ query, data }) {
  return new Promise((resolve, reject) => {
    pool.query(query, [data], (error, results) => {
      if (error) {
        console.error(`Error executing query: ${query}`, error);
        reject(error);
      } else {
        console.log(`Query executed successfully: ${query}`);
        resolve(results);
      }
    });
  });
}

// ...

// ...

// route halaman grafik bar
router.get("/graph-bar", (req, res) => {
  const selectedAttribute = "";
  try {
    // Dapatkan atribut yang dipilih dari dropdown
    const selectedAttribute = req.body["atribut-1"];

    // Lakukan query ke database
    const query = `SELECT id, MntWines
                    FROM products
                    ORDER BY MntWines DESC
                    LIMIT 10;`;

    // Eksekusi query
    pool.query(query, (error, results, fields) => {
      if (error) {
        console.error("Error executing query:", error);
        res.status(500).send("Internal Server Error");
        return;
      }

      // Kirim data ke template EJS
      res.render("graph-bar/index", {
        Head: Head("../css/output.css", "../js/cosmetic.js", "Grafik Bar"),
        Header: Header.global,
        Path: "graph-bar",
        Navigation: Navigation.global,
        Layout: Layout.graph("graph-bar"),
        selectedAttribute: selectedAttribute,
        data: results,
      });
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/graph-bar", async (req, res) => {
  try {
    // Dapatkan atribut yang dipilih dari dropdown
    const selectedAttribute = req.body["atribut-1"];

    // Lakukan query ke database
    const query = `SELECT id, ${selectedAttribute}
                    FROM products
                    ORDER BY ${selectedAttribute} DESC
                    LIMIT 10;`;

    // Eksekusi query
    pool.query(query, (error, results, fields) => {
      if (error) {
        console.error("Error executing query:", error);
        res.status(500).send("Internal Server Error");
        return;
      }
      const data = results.map((row) => ({ ...row }));
      // Kirim data ke template EJS
      res.render("graph-bar/index", {
        Head: Head("../css/output.css", "../js/cosmetic.js", "Grafik Bar"),
        Header: Header.global,
        Path: "graph-bar",
        Navigation: Navigation.global,
        Layout: Layout.graph("graph-bar"),
        selectedAttribute: selectedAttribute,
        data: data,
      });
      console.log(data);
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

// route halaman scatter plot
router.get("/scatter-plot", (req, res) => {
  try {
    // Dapatkan atribut yang dipilih dari query parameters
    const selectedAttribute1 = req.body["atribut-1"];
    const selectedAttribute2 = req.body["atribut-2"];
    // Lakukan query ke database
    const query = `SELECT people.Income, products.MntFruits
    FROM products 
    INNER JOIN people ON products.id = people.id`;

    // Eksekusi query
    pool.query(query, (error, results) => {
      if (error) {
        console.error("Error executing query:", error);
        res.status(500).send("Internal Server Error");
        return;
      }

      const data = results.map((row) => ({ ...row }));

      // Kirim data ke template EJS
      res.render("scatter-plot/index", {
        Head: Head("../css/output.css", "../js/cosmetic.js", "Scatter Plot"),
        Header: Header.global,
        Path: "scatter-plot",
        Navigation: Navigation.global,
        Layout: Layout.scatter("scatter-plot"),
        selectedAttribute1: selectedAttribute1,
        selectedAttribute2: selectedAttribute2,
        data: data,
      });
      console.log(data);
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/scatter-plot", async (req, res) => {
  try {
    const selectedAttribute1 = req.body["atribut-1"];
    const selectedAttribute2 = req.body["atribut-2"];

    const query = `SELECT people.${selectedAttribute1}, products.${selectedAttribute2}
                        FROM products 
                        INNER JOIN people ON products.id = people.id
                        ORDER BY people.${selectedAttribute1} DESC`;

    pool.query(query, (error, results, fields) => {
      if (error) {
        console.error("Error executing query:", error);
        res.status(500).send("Internal Server Error");
        return;
      }

      const data = results.map((row) => ({ ...row }));

      // Kirim data ke template EJS
      res.render("scatter-plot/index", {
        Head: Head("../css/output.css", "../js/cosmetic.js", "Scatter Plot"),
        Header: Header.global,
        Path: "scatter-plot",
        Navigation: Navigation.global,
        Layout: Layout.scatter("scatter-plot"),
        selectedAttribute1: selectedAttribute1,
        selectedAttribute2: selectedAttribute2,
        data: data,
      });
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

// route halaman summary
router.get("/summary", (req, res) => {
  res.render("summary/index", {
    Head: Head("../css/output.css", "../js/cosmetic.js", "Summary"),
    Header: Header.global,
    Path: "summary",
    Navigation: Navigation.global,
    Data: data,
  });
});

const atribut = {
  People: [
    { ID: "Customer's unique identifier" },
    { Year_Birth: "Customer's birth year" },
    { Education: "Customer's education level" },
    { Marital_Status: "Customer's marital status" },
    { Income: "Customer's yearly household income" },
    { Kidhome: "Number of children in customer's household" },
    { Teenhome: "Number of teenagers in customer's household" },
    { Dt_Customer: "Date of customer's enrollment with the company" },
    { Recency: "Number of days since customer's last purchase" },
    {
      Complain: "1 if the customer complained in the last 2 years, 0 otherwise",
    },
  ],
  Products: [
    { ID: "Product's unique identifier" },
    { MntWines: "Amount spent on wine in last 2 years" },
    { MntFruits: "Amount spent on fruits in last 2 years" },
    { MntMeatProducts: "Amount spent on meat in last 2 years" },
    { MntFishProducts: "Amount spent on fish in last 2 years" },
    { MntSweetProducts: "Amount spent on sweets in last 2 years" },
    { MntGoldProds: "Amount spent on gold in last 2 years" },
  ],
  Promotion: [
    { ID: "Promotion's unique identifier" },
    { NumDealsPurchases: "Number of purchases made with a discount" },
    {
      AcceptedCmp1:
        "1 if customer accepted the offer in the 1st campaign, 0 otherwise",
    },
    {
      AcceptedCmp2:
        "1 if customer accepted the offer in the 2nd campaign, 0 otherwise",
    },
    {
      AcceptedCmp3:
        "1 if customer accepted the offer in the 3rd campaign, 0 otherwise",
    },
    {
      AcceptedCmp4:
        "1 if customer accepted the offer in the 4th campaign, 0 otherwise",
    },
    {
      AcceptedCmp5:
        "1 if customer accepted the offer in the 5th campaign, 0 otherwise",
    },
    {
      Response:
        "1 if customer accepted the offer in the last campaign, 0 otherwise",
    },
  ],
  Place: [
    { ID: "Place's unique identifier" },
    {
      NumWebPurchases: "Number of purchases made through the company’s website",
    },
    { NumCatalogPurchases: "Number of purchases made using a catalogue" },
    { NumStorePurchases: "Number of purchases made directly in stores" },
    {
      NumWebVisitsMonth:
        "Number of visits to company’s website in the last month",
    },
  ],
};

// route halaman hint
router.get("/hint", (req, res) => {
  const origin = req.query.origin;
  res.render("hint/index", {
    Head: Head("../css/output.css", "../js/cosmetic.js", "Summary"),
    Header: Header.global,
    Navigation: Navigation.hint(origin),
    Path: "hint",
    Data: atribut,
  });
});

export default router;
