const { findAll, findByID, addToDatabase, getPostData, editModel, deleteData } = require('../services/modelServices')

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
        const product = await findByID(id)
        if (product) {
            generalResponse(req, res, product)
        }
        else {
            error404(req, res, 'Product')
        }

    } catch (error) {
        console.log(error)
    }



}

const addModel = async (req, res) => {

    try {
        const body = await getPostData(req)
        const { name, description, price } = JSON.parse(body)

        const newProduct = {
            name,
            description,
            price
        }

        const data = await addToDatabase(newProduct)
        generalResponse(req, res, data)
    } catch (error) {
        console.log(error)
    }
}

const updateModel = async (req, res, id) => {

    try {

        const itemToEdit = await findByID(id)

        if (itemToEdit) {
            const body = await getPostData(req)

            const { name, description, price } = JSON.parse(body)

            const newProduct = {
                name: name || itemToEdit.name,
                description: description || itemToEdit.description,
                price: price || itemToEdit.price
            }

            const data = await editModel(id, newProduct)
            generalResponse(req, res, data)
        } else {
            error404(req, res, 'Product')
        }



    } catch (err) {
        console.log(err)
    }
}

const deleteModel = async (req, res, id) => {
    try {
        const productToDelete = await findByID(id)

        if (productToDelete) {
            deleteData(id)
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.write(JSON.stringify({message:`Product with id:${id} is deleted`}))
            res.end()
        } else {
            error404(req, res, 'Product')
        }


    } catch (err) {
        console.log(err)
    }
}

const generalResponse = (req, res, data) => {
    if (req.method === 'GET' || req.method === 'PUT') {
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

const error404 = (req, res, item) => {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.write(JSON.stringify({ message: `${item} Not Found` }))
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
    updateModel,
    error404,
    deleteModel
}