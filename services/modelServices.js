const data = require('../data/database.json')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')
const { resolve } = require('path')

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

    return new Promise((resolve, reject) => {
        const product = data.products.find((par) => { return par.id === id })
        resolve(product)
    })
}

const addToDatabase = (item) => {

    return new Promise((resolve, reject) => {
        // const newProduct = JSON.parse(jsonObj)
        const newItem = { id: uuidv4(), ...item }
        data.products.push(newItem)

        // fs.appendFile(data, newProduct, (err) => {
        //     throw err
        // })
        writeDataToFile('./data/database.json', data)
        resolve(newItem)
    })


}

const editModel = (id, newItem) => {
    return new Promise((resolve, reject) => {
        try {
            // const itemToUpdate = data.products.find((par) => { return par.id === id })

            // itemToUpdate.name = newItem.name
            // itemToUpdate.description = newItem.description
            // itemToUpdate.price = newItem.price

            const index = data.products.findIndex((par) =>{return par.id === id} )
            data.products[index] = { id, ...newItem }
            writeDataToFile('./data/database.json', data)
            resolve(data.products[index])
        } catch (err) {
            reject(err)
        }
    })
}

const deleteData = (id) => {
    new Promise((resolve, reject)=>{
        try {
            data.products = data.products.filter((par) => { return par.id !== id })
            writeDataToFile('./data/database.json', data)
            resolve()
        } catch (err) {
            reject(err)
        }
    })
    

}

const getPostData = (req) => {
    return new Promise((resolve, reject) => {
        try {
            let body = ''
            req.on('data', (chunk) => {
                body += chunk.toString()
            })

            req.on('end', () => {
                resolve(body)
            })


        } catch (error) {
            reject(error)
        }
    })
}

const writeDataToFile = (filename, content) => {

    fs.writeFileSync(filename, JSON.stringify(content), 'utf8', (err) => {
        if (err) console.group(err)
    })
}

module.exports = {
    findAll,
    findByID,
    addToDatabase,
    getPostData,
    editModel,
    deleteData
}