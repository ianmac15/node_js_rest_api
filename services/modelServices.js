const data = require('../data/database.json')

const findAll = () => {
    const promise = new Promise((resolve, reject) => {
        resolve(data.products)
    })

    return promise
}

const findByID = (id) => {


    let dataTemp = null

    for (let i = 0; i < data.products.length; i++) {
        if (data.products.id === id) {
            dataTemp = data.products
        }
    }

    if (dataTemp) {
        const promise = new Promise((resolve, reject) => {
            resolve(dataTemp)
        })

        return promise
    }

    return dataTemp
}

module.exports = {
    findAll,
    findByID
}