const { expect }= require('chai');
const request = require("supertest");
const app = require('../app')
const { Contact } = require('../database/models')

const contact = [
  {
    name: "test1",
    phone: 123456789,
    email: "test1@test.com",
    message: "test message 1"
}
]

let token
describe('contacts', () => {

    before(async () => {
        request(app)
            .post('/auth/login')
            .send({
                email: 'admin@prueba.com',
                password: 'Abcd1234.'
              })
            .end((err, res) => {
                expect(res).to.have.property('status', 200)
                expect(res.body.body).to.have.property('token')
                token = res.body.body.token 
              })
              await Contact.bulkCreate(contact)
			})
      after(async () => {
        await Contact.destroy({ where: { name: 'test1' } })
      })


describe('GET /contacts', () => {
    it('should get a list of all contacts', async () => {
        const { body } = await request(app)
            .get('/contacts')
            .set('Authorization',`${token}`)
            .expect('Content-type',/json/)
            const { code, status, message, body: response } = body

            expect(code).to.be.a('number');
            expect(code).to.equal(200);
            expect(status).to.be.a('boolean');
            expect(status).to.equal(true);
            expect(message).to.be.a('string');
            expect(message).to.equal('Contacts retrieved successfully');
            expect(response).to.be.a('array'); 
        })
})

let contactId
  describe('POST /contacts', () => {
    it('should create a new contact', async () => {
      const res = await request(app)
        .post('/contacts')
        .send({
           name: 'test1',
           phone: 123456780,
           email: 'test@test.com',
           message: 'test message 1'
        })
        .expect(200)
        expect(res.body.body).to.have.property('name', 'test1')
        expect(res.body.body).to.have.property('phone', 123456780)
        expect(res.body.body).to.have.property('email', 'test@test.com')
        expect(res.body.body).to.have.property('message', 'test message 1')
        contactId = res.body.body.id
    })
  })


describe('GET /contacts without token', () => {
  it('should return a 403 error', async () => {
    const res = await request(app)
    .get('/contacts')
    expect(res).to.have.property('status', 403)
  })
})
describe('POST /contacts with invalid fields', () => {
      it('should return a 400 error', async () => {
        const res = await request(app)
          .post('/contacts')
          .set('Authorization',`${token}`)
          .send({
            name: '',
            image: 'link',
            description:'test invalid fields'
          }) 
        expect(res).to.have.property('status', 400)
      })
    })
  })
