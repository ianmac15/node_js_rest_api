// import http from 'http';
const { match } = require('assert')
const http = require('http')
const { getModels, getModelByID, addModel, error404, updateModel } = require('./controllers/modelController')


const server = http.createServer((req, res) => {
    if (req.url === '/api/products') {
        if (req.method === 'GET') {
            getModels(req, res)
        } else if (req.method === 'POST') {
            addModel(req, res)
        }
    } else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'GET') {
        const id = req.url.split('/')[3]
        getModelByID(req, res, id)
    } else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'PUT') {
        const id = req.url.split('/')[3]
        updateModel(req, res, id)
    }
    else {
        error404(req, res)
    }
})


const PORT = process.env.PORT | 5000

server.listen(PORT, () => { console.log(`Server running on port ${PORT}`) })