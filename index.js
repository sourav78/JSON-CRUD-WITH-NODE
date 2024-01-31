import express from "express";
// import userData from './mockdata.json'

import { addProduct, showProducts } from "./controllers.js";

const app = express()

app.use(express.json())

app.get('/', showProducts)

app.post("/add-product", addProduct)

app.post("/update-product", (req, res) => {

})

app.get("/buy/:productName", (req, res) => {

})

app.listen(3000, () => {
    console.log(`http://localhost:3000`);
})