const e = require('express');
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
            res.status(500).json({ message: "The users information could not be retrieved" })
        })

})

server.post('/api/users', (req,res) => {
    if (!req.body.name || !req.body.bio) {
        res.status(400).json({ message: "Please provide name and bio for the user" })
    } else {
        User.insert(req.body)
            .then(resp => {
                res.status(201).json(resp)
            })
            .catch(err => res.status(500).json({ message: "There was an error while saving the user to the database" }))
    }
    
})

server.get('/api/users/:id', (req,res) => {
    User.findById(req.params.id)
        .then(resp =>{
            if(!resp) {
                res.status(404).json({ message: "The user with the specified ID does not exist" })
            } else {
                res.status(200).json({data: resp})
            }
            
        })
        .catch(err => {
            res.status(500).json(err)
        })
})
server.delete('/api/users/:id', (req,res) => {
    User.remove(req.params.id)
        .then(resp => {
            if(!resp){
                res.status(404).json({ message: "The user with the specified ID does not exist" })
            }
            else{
                res.status(204).json({message: "User successfully deleted"})
            }
        })
        .catch(err => res.status(500).json({ message: "The user could not be removed" })
        )

})

server.put('/api/users/:id', (req,res) => {
    if (!req.body.name || !req.body.bio) {
        res.status(400).json({ message: "Please provide name and bio for the user" })
    } else {
        User.update(req.body)
            .then(resp => {
                if(!resp){
                    res.status(404).json({ message: "The user with the specified ID does not exist" })
                } else {
                    res.status(200).json(resp)
                }
            })
            .catch(err => res.status(500).json({ message: "The user information could not be modified" }))
    }
})
module.exports = server; // EXPORT YOUR SERVER instead of {}
