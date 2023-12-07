import express from "express"
import routes from "./controller/routes.js"

const app = express()
const port = 3000

app.listen(port, ()=> {
    console.log(`Running on port ${port}`)
})

app.use(express.static("public"))
app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: false}))
app.use(routes)