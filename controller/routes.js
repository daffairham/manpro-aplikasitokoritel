import express from "express"

// components
import { Header } from "../components/header/index.js" 
import { Navigation } from "../components/navigation-bar/index.js"
import { Layout } from "../components/layout/index.js"
import { Head } from "../components/head/index.js"

const router = express.Router()

// route halaman landing
router.get('/', (req,res) => {
    res.render('landing/index', {
        Head: Head('../css/output.css', '../js/cosmetic.js', 'Landing'),
        Header: Header.landing,
    })
})

// route halaman upload
router.get('/upload-csv', (req,res) => {
    res.render('upload-csv/index', {
        Head: Head('../css/output.css', '../js/cosmetic.js', 'Upload CSV'),
        Header: Header.global,
        Path: 'upload-csv',
        Navigation: Navigation.global,
        Layout: Layout.global('upload-csv'),
    })
})

// route halaman grafik bar
router.get('/graph-bar', (req,res) => {
    res.render('graph-bar/index', {
        Head: Head('../css/output.css', '../js/cosmetic.js', 'Grafik Bar'),
        Header: Header.global,
        Path: 'graph-bar',
        Navigation: Navigation.global,
        Layout: Layout.graph('graph-bar')
    })
})

// route halaman scatter plot
router.get('/scatter-plot', (req,res) => {
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
router.get('/summary', (req,res) => {
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
router.get('/hint', (req,res) => {
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