import express from "express";
// import userData from './mockdata.json'

import fs from 'fs'

let Products

try {
    const jsonData = await fs.readFileSync('./mockdata.json', 'utf-8');
    Products = JSON.parse(jsonData);
    // console.log(Products);
} catch (error) {
    console.error('Error reading or parsing JSON file:', error);
}

const app = express()

app.use(express.json())

app.get('/', (req, res) => {

    let mode = req.query.mode
    // console.log(req.query);

    if (mode === undefined) {

        // res.json(Products)
        
        let allProducts = `
        <ul>
        ${Products.map((prod) => {
            return `<li style="font-size: 28px">${prod.name} - ${prod.stock} - ratting ${prod.ratting}</li>`
        }).join("")}
        </ul>
        `
        res.send(allProducts)

    } else if (mode === "create") {

        // mode=create&name=mouse&stock=7&ratting=5&category=gadget

        const { mode, ...userIn } = req.query

        Products = [...Products, userIn]

        fs.writeFile('./mockdata.json', JSON.stringify([Products]), (err) => {
            if (err) {
                console.log(err);
                res.status(500).json({ status: "Error updating user data" });
            } else {
                res.json({ status: "User data updated", user: userIn });
            }
        })

        console.log(userIn);
        res.send('create')

    } else if (mode === 'update') {

        // mode=update&name=mouse&stock=7&ratting=5&category=gadget

        res.send('update')


    } else if (mode === 'delete') {

        res.send('delete')

    }

})

app.listen(3000, () => {
    console.log(`http://localhost:3000`);
})