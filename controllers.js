import fs from 'fs'

let Products

try {
    const jsonData = await fs.readFileSync('./mockdata.json', 'utf-8');
    Products = JSON.parse(jsonData);
} catch (error) {
    console.error('Error reading or parsing JSON file:', error);
}

const showProducts = (req, res) => {

    let allProducts = `
        <ul>
        ${Products.map((prod) => {
        return `<li style="font-size: 28px">${prod.name} - ${prod.stock} - ratting ${prod.ratting}</li>`
    }).join("")}
        </ul>
    `

    res.send(allProducts)
}

const addProduct = (req, res) => {

    const newProduct = req.body
    Products = [...Products, newProduct]

    fs.writeFile('./mockdata.json', JSON.stringify(Products), (err) => {
        if (err) {
            console.log(err);
            res.status(500).json({ status: "Error updating user data" });
        } else {
            res.json({ status: "User data updated", user: newProduct });
        }
    })

}

export { addProduct, showProducts }