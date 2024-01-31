import fs from 'fs'

const saveIntoFiles = ( res, originalData, secondaryData) => {
    fs.writeFile('./mockdata.json', JSON.stringify(originalData), (err) => {
        if (err) {
            console.log(err);
            res.status(500).json({ status: "Error updating product data" });
        } else {
            res.json({ status: "product data updated", product: secondaryData });
        }
    })
}

export {saveIntoFiles}