const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const referee = require('./routes/referee')

mongoose.connect('mongodb://localhost/LeagueAPI')
    .then(() => {console.log('Connected to MongoDB')})
    .catch(err => {console.log('Couldn\'t connect to mongodb')})

app.use(express.json())

app.get('/', (req,res)=>{
    res.send('Hello world')
})

app.use('/api/referees',referee)


const server = app.listen(port,()=>{
    console.log('App listening at https://localhost:', port)
})

module.exports = server