const request = require('supertest')
const { expect } = require('chai')
const app = require('../app')

const newUser = {
    firstName:'User',
    lastName:'Register',
    email:'test051@gmail.com',
    password:'#12345Test.',
}

let token;

describe('routes /auth',() => {
    describe('endpoint POST /auth/register', () => {
        it('Should create new user', async() => {
        const {body} = await request(app)
            .post('/auth/register')
            .send(newUser)
            .set('Accept', 'aplication/json')
            .expect('Content-Type', /json/)
            const {code, status, message,body:response} = body
            expect(code).to.be.a('number')
            expect(code).to.equal(200)
            expect(status).to.be.a('boolean')
            expect(status).to.equal(true)
            expect(message).to.be.a('string')
            expect(message).to.equal('User successfuly created')
            expect(response).to.be.a('object')
        }) 
    })

    //Test validation Error
    describe('endpoint POST /auth/register Error',()=> {
        it('should return 400 error', (done) => {
            request(app)
            .post('/auth/register')
            .send({firstName:'Test', password: 13245})
            .end((err,res) => {
                expect(res).to.have.property('status',400)
                done()
            })
        })
    })

    // Test User that already exists
    describe('endpoint POST /auth/register Error',()=> {
        it('Should return a 404 error',(done) => {
            request(app)
            .post('/auth/register')
            .send(newUser)
            .end((err, res) => {
              expect(res).to.have.property('status', 404)
              done()
            })

        })
    })

    // Test login
    describe('endpoint POST /auth/login' ,() => {
        it('should login a user', (done) =>{
            request(app)
            .post('/auth/login')
            .send({
                email: newUser.email,
                password: newUser.password
            })
            .end((err,res) =>{
            expect(res).to.have.property('status', 200)
            expect(res.body).to.have.property('message', 'Login successfuly created')
            expect(res.body.body).to.have.keys('user', 'token')
            token = res.body.token
            done()
            })
        })
    })

    // Test login with wrong credentials
    describe('endpoint POST /auth/login error',() => {
        it('should get a password error',(done) => {
            request(app)
            .post('/auth/login')
            .send({
                email: newUser.email,
                password:'TestError435.'
            })
            .end((err,res) => {
                expect(res).to.have.property('status', 403)
                done()
            })
        })
    })

    // Test Get me without token
    describe('endpoint GET /auth/me without headers', () => {
        it('shoulds return 403 error', (done) => {
            request(app)
            .get('/auth/me')
            .end((err,res) => {
                expect(res).to.have.property('status',403)
                done()
            })
        })
    })
})




