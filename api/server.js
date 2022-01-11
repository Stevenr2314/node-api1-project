const express = require('express')
const server = express();
const User = require('./users/model')

server.use(express.json())

server.get('/api/users', (req,res) => {
    User.find()
        .then(resp => {
            res.status(200).json(resp)
        })
        .catch(err => {
            res.status(500).json(err)
        })

})

server.post('/api/users', (req,res) => {

})

server.get('/api/users/:id', (req,res) => {
    User.findById(req.params.id)
        .then(resp =>{
            res.status(200).json(resp)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})
server.delete('/api/users/:id', (req,res) => {

})

server.put('/api/users/:id', (req,res) => {

})
module.exports = server; // EXPORT YOUR SERVER instead of {}
