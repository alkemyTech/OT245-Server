const request = require('supertest')
const {expect} = require('chai')
const { User } = require('../database/models')

const app = require('../app')

let token, idUser;

describe('Test in users /users', () => {
    const putUser = {
        firstName: 'putTest1',
        lastName: 'putTest1',
        password: 'Rr123456#',
        email: 'test1@test1.com'
    }

    const createUser = {
        firstName: 'test2',
        lastName: 'test2',
        password: 'Rr123456#',
        email: 'test2@test2.com'
    }

    before( async()=> {
        const { body } = await request(app).post('/auth/login')
        .set('Accept', 'application/json')
        .send({
            email: 'test1@test1.com',
            password: 'Rr123456#'
        })
        .expect('Content-Type',/json/)

        const { body:response } = body;
        token = response.token
        idUser = response.user.id
    })
    describe('GET /users', () => { 
        it('GET [SUCCESS] should return a list of users', async()=> {
            const {body}= await request(app)
            .get('/users')
            .set('Authorization', token)
            .set('Accept', 'aplication/json')
            .expect('Content-type',/json/)
            
            const { code, status, message, body: response } = body
            expect(body.code).to.be.a('number')
            expect(code).to.equal(200);
            expect(status).to.be.a('boolean');
            expect(status).to.equal(true);
            expect(message).to.be.a('string');
            expect(message).to.equal('Users listed');
            expect(response).to.be.a('array');
    
        })        
     })
    describe('POST /users', () => { 
        it('POST [SUCCESS] should return an create user', async()=> {
            const {body}= await request(app).post(`/auth/register`)
                            .send(createUser)
                            .set('Accept', 'aplication/json')
                            .expect('Content-Type', /json/)
            const { code, status, message, body: response } = body
                
            expect(code).to.be.a('number');
            expect(code).to.equal(200);
            expect(status).to.be.a('boolean');
            expect(status).to.equal(true);
            expect(message).to.be.a('string');
            expect(message).to.equal('User successfuly created');
            expect(response).to.be.a('object'); 

            after(async () => {
                await User.destroy({ where: { firstName: 'test2'}, force: true })
              })
        })        
     })
     describe('PUT /users/:id', () => { 
        it('PUT [ERROR] should return an error about id doesn\'t exist', async()=> {

            const {error}= await request(app).put(`/users/7000`)
                            .send(putUser)
                            .set('Accept', 'text/html; charset=utf-8')
                            .expect('Content-Type', /text\/html/)
            
            const { status, text } = error                   
            expect(status).to.be.a('number');
            expect(status).to.equal(404);
            expect(text).to.be.a('string');
            expect(text).to.contain('NotFoundError')
            expect(text).to.contain('UserId updated failed')    
        })   

        it('PUT [SUCCESS] should return an update user', async()=> {

            const {body}= await request(app).put(`/users/${idUser}`)
                            .send(putUser)
                            .set('Accept', 'aplication/json')
                            .expect('Content-Type', /json/)
            const { code, status, message, body: response } = body
                
            expect(code).to.be.a('number');
            expect(code).to.equal(200);
            expect(status).to.be.a('boolean');
            expect(status).to.equal(true);
            expect(message).to.be.a('string');
            expect(message).to.equal('User successfuly updated');
            expect(response).to.be.a('object'); 
        })        
     })
})