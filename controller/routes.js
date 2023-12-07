import express from "express"

// components
import { Header } from "../components/header/index.js" 




const router = express.Router()


router.get('/', (req,res) => {
    res.render('landing/index', {
        title: 'Landing',
        Header: Header.landing,
    })
})

export default router