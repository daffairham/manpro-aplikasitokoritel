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
        cb(null, "uploads/");
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
    
    const filePath = path.resolve(__dirname, "public", "uploads", req.file.filename);
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
            rows.shift(); // Remove header row

            const peopleData = [];
            const productsData = [];
            const promotionData = [];
            const placeData = [];

            rows.forEach((row) => {
                // Assuming the Excel columns correspond to the table columns
                const peopleRow = [
                    row.ID,
                    row.Year_Birth,
                    row.Education,
                    row.Marital_Status,
                    row.Income,
                    row.Kidhome,
                    row.Teenhome,
                    row.Dt_Customer,
                    row.Recency,
                    row.Complain,
                ];

                const productsRow = [row.ID, row.MntWines, row.MntFruits, row.MntMeatProducts, row.MntFishProducts, row.MntSweetProducts, row.MntGoldProds];
                const promotionRow = [row.ID, row.NumDealsPurchases, row.AcceptedCmp1, row.AcceptedCmp2, row.AcceptedCmp3, row.AcceptedCmp4, row.AcceptedCmp5, row.Response];
                const placeRow = [row.ID, row.NumWebPurchases, row.NumCatalogPurchases, row.NumStorePurchases, row.NumWebVisitsMonth];

                peopleData.push(peopleRow);
                productsData.push(productsRow);
                promotionData.push(promotionRow);
                placeData.push(placeRow);
            });

            // Insert data into People table
            const peopleQuery =
                "INSERT INTO People (ID, Year_Birth, Education, Marital_Status, Income, Kidhome, Teenhome, Dt_Customer, Recency, Complain) VALUES ?";
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
                "INSERT INTO Products (ID, MntWines, MntFruits, MntMeatProducts, MntFishProducts, MntSweetProducts, MntGoldProds) VALUES ?";
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
                "INSERT INTO Promotion (ID, NumDealsPurchases, AcceptedCmp1, AcceptedCmp2, AcceptedCmp3, AcceptedCmp4, AcceptedCmp5, Response) VALUES ?";
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
                "INSERT INTO Place (ID, NumWebPurchases, NumCatalogPurchases, NumStorePurchases, NumWebVisitsMonth) VALUES ?";
            pool.query(placeQuery, [placeData], (error, results) => {
                if (error) {
                    console.error("Error inserting into Place table:", error);
                    reject(error);
                } else {
                    console.log("Data inserted into Place table successfully");
                    resolve();
                }
            });
        });
    });
}

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