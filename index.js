const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const referee = require('./routes/referee')
const config = require('config')

const db = config.get('db')
mongoose.connect(db)
    .then(() => {console.log(`Connected to ${db}`)})
    .catch(err => {console.log(`Couldnt connect to ${db}`)})

app.use(express.json())

app.get('/', (req,res)=>{
    res.send('Hello world')
})

app.use('/api/referees',referee)


const server = app.listen(port,()=>{
    console.log('App listening at https://localhost:', port)
})

module.exports = server