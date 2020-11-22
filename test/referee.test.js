const { assert, expect } = require('chai')
const request = require('supertest')

const Referee = require('../models/referee')

let server



//In order to import the model, it's better to have it in its own module

describe('/api/referees', () => {

    beforeEach(() => {
        server = require('../index')

        //Populating DataBase
        Referee.collection.insertMany([
            {   name: "Name1",
                age: 41,
                active: true},
            {    name: "Name2",
                age: 42,
                active: true},
            {    name: "Name3",
                age: 43,
                active: true}
        ])



    })

    afterEach(async()=>{
        server.close()
        await Referee.deleteMany({name: /.*/})  //delete all
    })



    it('GET /',async () => {


        const res = await request(server).get('/api/referees')

        expect(res.status).to.be.equal(200)
        expect(res.body.length).equal(3)

    })

    it('GET /:id', async() => {
        let exampleId
        let exampleName,exampleAge,exampleActive

        const referee = new Referee({
            name: "Name4",
            age: 10,
            active: false
        })

        const result = await referee.save()
        exampleId = result.id
        
        exampleName = result.get('name')
        exampleAge = result.get('age')
        exampleActive = result.get('active')

        const res = await request(server).get(`/api/referees/${exampleId}`)
        

        expect(res.status).to.equal(200)
        expect(res.body.length).equal(undefined)    //Is not an array of json objects, so has no property length
        expect(res.body.name).equal(exampleName)
        expect(res.body.age).equal(exampleAge)
        expect(res.body.active).equal(exampleActive)

    })


    it('POST /', async() => {
        const postBody = {
            name: "Name 4",
            age: 4,
            active: false
        }

        const res = await request(server)                    //Returns only this element, not all elements from database
                            .post('/api/referees')
                            .send(postBody)
        
        expect(res.status).equal(200)
        expect(res.body.name).equal(postBody.name)
        expect(res.body.age).equal(postBody.age)
        expect(res.body.active).equal(postBody.active)
        const exampleId = res.body._id

        //Check in the database
        const resultDatabase = await Referee.findById(exampleId).exec()
        expect(resultDatabase.name).equal(postBody.name)
        expect(resultDatabase.age).equal(postBody.age)                            
        expect(resultDatabase.active).equal(postBody.active)
    })


    it('PUT /:id', async() => {
        let exampleId

        var refereeData = {
            name: "Name4",
            age: 10,
            active: false
        }

        const referee = new Referee(refereeData)

        const result = await referee.save()
        exampleId = result.id

        refereeData.name = "Another Name"
        delete refereeData.age
        delete refereeData.active

        const res = await request(server)
                            .put(`/api/referees/${exampleId}`)
                            .send(refereeData)
       
        
        expect(res.body.name).equal(refereeData.name)
        expect(res.body.age).equal(10)                            
        expect(res.body.active).equal(false)

        //Check in the database
        const resultDatabase = await Referee.findById(exampleId).exec()
        expect(resultDatabase.name).equal(refereeData.name)
        expect(resultDatabase.age).equal(10)                            
        expect(resultDatabase.active).equal(false)


    })

    it('DELETE /:id',async () => {
        let exampleId

        var refereeData = {
            name: "Name4",
            age: 10,
            active: false
        }
        const referee = new Referee(refereeData)
        const result = await referee.save()
        exampleId = result.id

        const res = await request(server).delete(`/api/referees/${exampleId}`)
        expect(res.body.name).equal(refereeData.name)
        expect(res.body.age).equal(refereeData.age)
        expect(res.body.active).equal(refereeData.active)

        //Check it's deleted
        expect(await Referee.findById(exampleId).exec()).equal(null)

    })

    it('works',async () => {
        const res = await request(server).get('/api/referees?name=Name1')

        expect(res.status).equal(200)
        expect(res.body.length).equal(1)
    })
})
