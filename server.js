// import http from 'http';
const http = require('http')
const { getModels, getModelByID } = require('./controllers/modelController')


const server = http.createServer((req, res) => {
    // res.statusCode = 200
    // res.setHeader('Content-Type', 'text/html')
    // res.write('<h1>Hello World</h1>')
    // res.end()
    // serverCall(req, res, 'GET')
    if (req.url === '/api/products' && req.method === 'GET') {
        getModels(req, res)
    } 
    else if (req.url === `/api/products/${id}`) {
        getModelByID(res, req, id)
    } 
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.write(JSON.stringify({ message: 'Route Not Found' }))
        res.end()
    }

   
    
})



const PORT = process.env.PORT | 5000

server.listen(PORT, () => { console.log(`Server running on port ${PORT}`) })