import fs from 'fs'

let Products

try {
    const jsonData = await fs.readFileSync('./mockdata.json', 'utf-8');
    Products = JSON.parse(jsonData);
} catch (error) {
    console.error('Error reading or parsing JSON file:', error);
}

const showProducts = (req, res) => {

    let allProduct = `<table border="2" style="font-size: 24px; border-collapse: collapse">
            <tr>
                <th style="padding: 2px 10px">Product</th>
                <th style="padding: 2px 10px">Price</th>
                <th style="padding: 2px 10px">Ratting</th>
                <th style="padding: 2px 10px">Stock</th>
            </tr>`

    Products.map(prod => {
        allProduct = allProduct + `
        <tr>
            <td style="padding: 2px 10px">${prod.name}</td>
            <td style="padding: 2px 10px">${prod.price}</td>
            <td style="padding: 2px 10px">${prod.ratting}*</td>
            <td style="padding: 2px 10px">${prod.stock}</td>
        </tr>
        `
    })

    res.send(allProduct)
}

const addProduct = (req, res) => {

    const newProduct = req.body
    Products.push(newProduct)

    fs.writeFile('./mockdata.json', JSON.stringify(Products), (err) => {
        if (err) {
            console.log(err);
            res.status(500).json({ status: "Error updating user product" });
        } else {
            res.json({ status: "User product updated", product: newProduct });
        }
    })

}

const updateProduct = (req, res) => {

    const { name, updatedItem } = req.body

    let updatedProducts = Products.map((product) => {
        if (product.name === name) {
            return { ...product, ...updatedItem }
        }

        return product
    })

    fs.writeFile('./mockdata.json', JSON.stringify(updatedProducts), (err) => {
        if (err) {
            console.log(err);
            res.status(500).json({ status: "Error updating product data" });
        } else {
            res.json({ status: "product data updated", product: updatedItem });
        }
    })

}

const deleteProduct = (req, res) => {
    const { name } = req.body

    let deletedProduct = Products.filter(product => product.name !== name)

    fs.writeFile('./mockdata.json', JSON.stringify(deletedProduct), (err) => {
        if (err) {
            console.log(err);
            res.status(500).json({ status: "Error updating product data" });
        } else {
            res.json({ status: "product data updated", product: name });
        }
    })
}

const buyProduct = (req, res) => {
    const productName = req.params.productName

    let buyProduct = Products.map(prod => {
        return prod.name === productName ? { ...prod, stock: Number(prod.stock) - 1 } : prod
    })

    fs.writeFile('./mockdata.json', JSON.stringify(buyProduct), (err) => {
        if (err) {
            console.log(err);
            res.status(500).json({ status: "Error updating product data" });
        } else {
            res.json({ status: "product data updated", product: productName });
        }
    })
    
}

export {
    addProduct,
    showProducts,
    updateProduct,
    deleteProduct,
    buyProduct
}