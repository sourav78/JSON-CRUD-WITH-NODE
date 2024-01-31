import express from "express";

import { addProduct, deleteProduct, showProducts, updateProduct } from "./controllers.js";

const app = express()

app.use(express.json())

app.get('/', showProducts)

app.post("/add-product", addProduct)

app.post("/update-product", updateProduct)

app.post("/delete-product", deleteProduct)

app.get("/buy/:productName", (req, res) => {

})

app.listen(3000, () => {
    console.log(`http://localhost:3000`);
})