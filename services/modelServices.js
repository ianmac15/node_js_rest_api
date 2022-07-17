const data = require('../data/database.json')
const fs = require('fs')
const {v4: uuidv4} = require('uuid')

const findAll = () => {
    const promise = new Promise((resolve, reject) => {
        resolve(data.products)
    })

    return promise
}

const findByID = (id) => {

    // for (let i = 0; i < data.products.length; i++) {
    //     if (data.products[i].id === id) {
    //         const promise = new Promise((resolve, reject) => {
    //             resolve(data.products[i])
    //         })

    //         return promise
    //     }
    // }

    // return null

    return new Promise((resolve, reject)=>{
        const product = data.products.find((par)=>{par.id === id})
        resolve(product)
    })
}

const addToDatabase = (item) => {

    return new Promise((resolve, reject)=>{
        // const newProduct = JSON.parse(jsonObj)
        const newItem = {...item, id: uuidv4()}
        data.products.push(newItem)
        // fs.appendFile(data, newProduct, (err) => {
        //     throw err
        // })
        writeDataToFile('./data/database.json', data.products)
        resolve(newItem)
    })
    
    
}

const writeDataToFile = (filename, content) => {

    fs.writeFileSync(filename, JSON.stringify(content), 'utf8', (err)=>{
        if (err) console.group(err)
    })
}

module.exports = {
    findAll,
    findByID,
    addToDatabase
}