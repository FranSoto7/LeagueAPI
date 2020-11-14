const { assert, expect } = require('chai')
const request = require('supertest')

const Referee = require('../models/referee')




//In order to import the model, it's better to have it in its own module


describe('/api/referees', () => {



    beforeEach(() => {
        server = require('../index')

        //Populating DataBase
        Referee.collection.insertMany([
            {    name: "Nombre1",
                age: 41,
                active: true},
            {    name: "Nombre2",
                age: 42,
                active: true},
            {    name: "Nombre3",
                age: 43,
                active: true}
        ])



    })

    afterEach(async()=>{
        server.close()
        await Referee.remove({})
    })



    it('gets referees',async () => {


        const res = await request(server).get('/api/referees')


        expect(res.status).to.be.equal(200)
        expect(res.body.length).equal(3)

    })


    describe('Custom select',() => {
        it('works',async () => {
            const res = await request(server).get('/api/referees?name=Nombre1')

            expect(res.status).equal(200)
            expect(res.body.length).equal(1)
        })
    })
})

