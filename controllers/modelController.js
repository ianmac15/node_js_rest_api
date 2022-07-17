const { findAll, findByID, addToDatabase } = require('../services/modelServices')

const getModels = async (req, res) => {
    
        try {
            const data = await findAll()
            generalResponse(req, res, data)
        } catch (error) {
            console.log(error)
        }
    


}

const getModelByID = async (req, res, id) => {
    
        try {
            const data = await findByID(id)
            if (data) {
                generalResponse(req, res, data)
            } else {
                error404(req, res)
            }

        } catch (error) {
            console.log(error)
        }
    


}

const addModel = async (req, res) => {
    
        try {

            const newProduct = {
                name: "Airpods",
                description: "Bluetooth",
                price: 89.99
            }

            const data = await addToDatabase(newProduct)
            generalResponse(req, res, data)
        } catch (error) {
            console.log(error)
        }
    

}

const generalResponse = (req, res, data) => {
    if (req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' })

    } else if (req.method === 'POST') {
        res.writeHead(201, { 'Content-Type': 'application/json' })
    }
    res.write(JSON.stringify(data))
    res.end()

    // if (req.url === url && req.method === method) {

    // console.log(data.constructor.name)
    // }
    // else {
    //     res.writeHead(404, { 'Content-Type': 'application/json' })
    //     res.write(JSON.stringify({ message: 'Route Not Found' }))
    //     res.end()
    // }
}

const error404 = (req, res) => {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.write(JSON.stringify({ message: 'Route Not Found' }))
    res.end()
}

const tryCatch = (value) => {
    try {
        if (value) {
            generalRequest(req, res, value)
        } else {
            error404(req, res)
        }

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getModels,
    getModelByID,
    addModel,
    error404
}