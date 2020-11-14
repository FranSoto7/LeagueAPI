const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const aHardCodedReferee = [{name: 'Manolito', age: 53}, {name: 'Pepito', age: 22}, ]


const Referee = require('../models/referee')



router.get('/:id',async (req,res)=>{
    res.send(await Referee.findById(req.params.id).exec())
})


//User URl will be like: /referees/select?name=Pepe&age=43
//NO params => req.query.* == undefined => SELECT ALL
router.get('/',async (req,res)=>{
    const query = {}
    if(req.query.name!=undefined) query.name = req.query.name
    if(req.query.age!=undefined) query.age = req.query.age
    if(req.query.active!=undefined) query.active = req.query.active
    
    res.send(await Referee.find(query).exec())
})

//TODO: Data Validation
router.post('/', async (req,res)=>{
    console.log(req.params.name)


    const referee = new Referee({
        name: req.body.name,
        age: req.body.age,
        active: req.body.active
    })
    
    const result = await referee.save()

    res.send(result)
})

//Can only update given the id
router.put('/:id',async (req,res)=>{
    const updateValues = {}
    if(req.body.name!=undefined) updateValues.name = req.body.name
    if(req.body.age!=undefined) updateValues.age = req.body.age
    if(req.body.active!=undefined) updateValues.active = req.body.active
    
    console.log(updateValues)
    console.log(req.params.id)

    const result = await Referee.findByIdAndUpdate(req.params.id, updateValues, {new: true})
    res.send(result)
})

//Can only delete given the id
router.delete('/:id', async (req,res)=>{
    const result = await Referee.findByIdAndRemove(req.params.id)
    res.send(result)

})

module.exports = router
exports.Referee = Referee
exports.cadenita = 'hola'