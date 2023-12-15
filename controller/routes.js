import express from "express";
import multer from "multer";
import readXlsxFile from 'read-excel-file/node';
import path from 'path';
import xlsx from "xlsx";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// components
import { Header } from "../components/header/index.js"
import { Navigation } from "../components/navigation-bar/index.js"
import { Layout } from "../components/layout/index.js"
import { Head } from "../components/head/index.js"
import pool from "../db.js";

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
router.get('/', (req, res) => {
    res.render('landing/index', {
        Head: Head('../css/output.css', '../js/cosmetic.js', 'Landing'),
        Header: Header.landing,
    })
})

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
    console.log(req.file); // Log file information
    
    // Get the current module's file path
    const __filename = fileURLToPath(import.meta.url);
    // Get the directory path
    const __dirname = dirname(__filename);
    
    const filePath = path.resolve("public", "uploads", req.file.filename);
    importExcelData2MySQL(filePath)
        .then(() => {
            console.log("berhasil");
            res.redirect("/upload-csv");
        })
        .catch((error) => {
            console.error("Error importing data:", error);
            res.status(500).send("Maaf, saat ini masih belum bisa T-T, sudah 80% kok!");
        });
});


async function importExcelData2MySQL(filePath) {
    return new Promise((resolve, reject) => {
        readXlsxFile(filePath).then((rows) => {
            console.log("Rows before shift:", rows);
            rows.shift(); // Remove header row
            console.log("Rows after shift:", rows);
            const peopleData = [];
            const productsData = [];
            const promotionData = [];
            const placeData = [];

            rows.forEach((row) => {
                // Assuming the Excel columns correspond to the table columns
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
            console.log("People Data:", peopleData);
            console.log("Products Data:", productsData);
            console.log("Promotion Data:", promotionData);
            console.log("Place Data:", placeData);

            // Insert data into People table
            const peopleQuery =
                "INSERT INTO people (Year_Birth, Education, Marital_Status, Income, Kidhome, Teenhome, Dt_Customer, Recency, Complain) VALUES ?";
            pool.query(peopleQuery, [peopleData], (error, results) => {
                if (error) {
                    console.error("Error inserting into People table:", error);
                    reject(error);
                } else {
                    console.log("Data inserted into People table successfully");
                }
            });

            // Insert data into Products table
            const productsQuery =
                "INSERT INTO products (MntWines, MntFruits, MntMeatProducts, MntFishProducts, MntSweetProducts, MntGoldProds) VALUES ?";
            pool.query(productsQuery, [productsData], (error, results) => {
                if (error) {
                    console.error("Error inserting into Products table:", error);
                    reject(error);
                } else {
                    console.log("Data inserted into Products table successfully");
                }
            });

            // Insert data into Promotion table
            const promotionQuery =
                "INSERT INTO promotion (NumDealsPurchases, AcceptedCmp1, AcceptedCmp2, AcceptedCmp3, AcceptedCmp4, AcceptedCmp5, Response) VALUES ?";
            pool.query(promotionQuery, [promotionData], (error, results) => {
                if (error) {
                    console.error("Error inserting into Promotion table:", error);
                    reject(error);
                } else {
                    console.log("Data inserted into Promotion table successfully");
                }
            });

            // Insert data into Place table
            const placeQuery =
                "INSERT INTO place (NumWebPurchases, NumCatalogPurchases, NumStorePurchases, NumWebVisitsMonth) VALUES ?";
            pool.query(placeQuery, [placeData], (error, results) => {
                if (error) {
                    console.error("Error inserting into Place table:", error);
                    reject(error);
                } else {
                    console.log("Data inserted into Place table successfully");
                    resolve("Data inserted into the database successfully");
                }
            });
        });
    });
}

// ...

// ...

// route halaman grafik bar
router.get('/graph-bar', (req, res) => {
    res.render('graph-bar/index', {
        Head: Head('../css/output.css', '../js/cosmetic.js', 'Grafik Bar'),
        Header: Header.global,
        Path: 'graph-bar',
        Navigation: Navigation.global,
        Layout: Layout.graph('graph-bar')
    })
})

// route halaman scatter plot
router.get('/scatter-plot', (req, res) => {
    res.render('scatter-plot/index', {
        Head: Head('../css/output.css', '../js/cosmetic.js', 'Scatter Plot'),
        Header: Header.global,
        Path: 'scatter-plot',
        Navigation: Navigation.global,
        Layout: Layout.graph('scatter-plot'),
    })
})


const data = {
    "tahun": ["2020", "2021", "2022"],
    "penjualan_daging": [
        {
            "jenis_daging": "Sapi",
            "penjualan": [350, 400, 380, 123, 2312, 8129]
        },
        {
            "jenis_daging": "Ayam",
            "penjualan": [500, 550, 600]
        },
        {
            "jenis_daging": "Kambing",
            "penjualan": [200, 220, 250]
        }
    ]
}

// route halaman summary
router.get('/summary', (req, res) => {
    res.render('summary/index', {
        Head: Head('../css/output.css', '../js/cosmetic.js', 'Summary'),
        Header: Header.global,
        Path: 'summary',
        Navigation: Navigation.global,
        Data: data,
    })
})

const atribut = {
    "People": [
        { "ID": "Customer's unique identifier" },
        { "Year_Birth": "Customer's birth year" },
        { "Education": "Customer's education level" },
        { "Marital_Status": "Customer's marital status" },
        { "Income": "Customer's yearly household income" },
        { "Kidhome": "Number of children in customer's household" },
        { "Teenhome": "Number of teenagers in customer's household" },
        { "Dt_Customer": "Date of customer's enrollment with the company" },
        { "Recency": "Number of days since customer's last purchase" },
        { "Complain": "1 if the customer complained in the last 2 years, 0 otherwise" }
    ],
    "Products": [
        { "ID": "Product's unique identifier" },
        { "MntWines": "Amount spent on wine in last 2 years" },
        { "MntFruits": "Amount spent on fruits in last 2 years" },
        { "MntMeatProducts": "Amount spent on meat in last 2 years" },
        { "MntFishProducts": "Amount spent on fish in last 2 years" },
        { "MntSweetProducts": "Amount spent on sweets in last 2 years" },
        { "MntGoldProds": "Amount spent on gold in last 2 years" }
    ],
    "Promotion": [
        { "ID": "Promotion's unique identifier" },
        { "NumDealsPurchases": "Number of purchases made with a discount" },
        { "AcceptedCmp1": "1 if customer accepted the offer in the 1st campaign, 0 otherwise" },
        { "AcceptedCmp2": "1 if customer accepted the offer in the 2nd campaign, 0 otherwise" },
        { "AcceptedCmp3": "1 if customer accepted the offer in the 3rd campaign, 0 otherwise" },
        { "AcceptedCmp4": "1 if customer accepted the offer in the 4th campaign, 0 otherwise" },
        { "AcceptedCmp5": "1 if customer accepted the offer in the 5th campaign, 0 otherwise" },
        { "Response": "1 if customer accepted the offer in the last campaign, 0 otherwise" }
    ],
    "Place": [
        { "ID": "Place's unique identifier" },
        { "NumWebPurchases": "Number of purchases made through the company’s website" },
        { "NumCatalogPurchases": "Number of purchases made using a catalogue" },
        { "NumStorePurchases": "Number of purchases made directly in stores" },
        { "NumWebVisitsMonth": "Number of visits to company’s website in the last month" }
    ]
}


// route halaman hint
router.get('/hint', (req, res) => {
    const origin = req.query.origin
    res.render('hint/index', {
        Head: Head('../css/output.css', '../js/cosmetic.js', 'Summary'),
        Header: Header.global,
        Navigation: Navigation.hint(origin),
        Path: 'hint',
        Data: atribut,
    })
})


export default router