const { findAll, findByID } = require('../services/modelServices')

const getModels = async (req, res) => {
    try {
        const data = await findAll()
        generalRequest(req, res, data)
    } catch (error) {
        console.log(error)
    }

}

const getModelByID = async (req, res, id) => {
    try {
        const data = await findByID(id)
        generalRequest(req, res, data)
    } catch (error) {
        console.log(error)
    }

}

// const postRequest = async (req, res) => {
//     try {
//         const data = await findAll()
//         serverCall(req, res, 'GET', data)
//     } catch (error) {
//         console.log(error)
//     }
// }

const generalRequest = (req, res, data) => {
    res.writeHead(200, { 'Content-Type': 'application/json' })
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

module.exports = {
    getModels,
    getModelByID
}