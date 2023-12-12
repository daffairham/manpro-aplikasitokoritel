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
        Layout: Layout.graphBar
    })
})

// route halaman scatter plot
router.get('/scatter-plot', (req,res) => {
    res.render('scatter-plot/', {
        Head: Head('../css/output.css', '../js/cosmetic.js', 'Scatter Plot'),
        Header: Header.global,
        Path: 'scatter-plot',
        Navigation: Navigation.global,
        Layout: Layout.graphBar,
    })
})
export default router