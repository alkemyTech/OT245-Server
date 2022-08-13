const request = require('supertest')
const { expect } = require('chai')
const app = require('../app')

describe('GET /organization/public', () => {
  it('organization data successfull retrieve', async () => {
    const { body: response } = await request(app)
      .get('/organization/public')
      .set('Accept', 'aplication/json')
      .expect('Content-Type', /json/)
      .expect(200)

    const { code, status, message, body } = response
    expect(code).to.be.a('number')
    expect(code).to.equal(200)
    expect(status).to.true
    expect(message).to.be.a('string')
    expect(message).to.equal('Organization information')
    expect(body).to.be.an('array')
  })
})

describe('PUT /organization/public/:id', () => {
  let token
  before(async () => {
    const { body: response } = await request(app)
      .post('/auth/login')
      .set('Accept', 'aplication/json')
      .send({
        email: 'demo@test.com',
        password: '12345Aa#',
      })
      .expect('Content-Type', /json/)

    token = response.body
  })

  const ongSchema = {
    name: 'demo',
    image: 'someurl.io',
    email: 'test@demo.com',
    welcomeText: 'welcome text',
    aboutUsText: 'about us text',
  }
  
  it('missing token', async () => {
    await request(app)
      .put('/organization/public/1')
      .send(ongSchema)
      .set('Accept', 'text/html; charset=utf-8')
      .expect('Content-Type', /text\/html/)
      .expect(403)
  })
  
  it('invalid token', async () => {
    await request(app)
      .put('/organization/public/1')
      .send(ongSchema)
      .set('Authorization', 'a')
      .set('Accept', 'text/html; charset=utf-8')
      .expect('Content-Type', /text\/html/)
      .expect(403)
  })
  
  it('wrong data', async () => {
    await request(app)
      .put('/organization/public/1')
      .send({
        image: 'a',
        email: 'some string',
        welcomeText: 'some welcom',
        aboutUsText: 'about us',
      })
      .set('Authorization', token)
      .set('Accept', 'text/html; charset=utf-8')
      .expect('Content-Type', /text\/html/)
      .expect(400)
  })
  
  it('updates organization successfully', async () => {
    const { body: response } = await request(app)
      .put('/organization/public/2')
      .send(ongSchema)
      .set('Authorization', token)
      .set('Accept', 'text/html; charset=utf-8')
      .expect('Content-Type', /json/)
      .expect(200)

    const { status, code, message, body } = response
    expect(status).to.true
    expect(code).to.be.a('number')
    expect(code).to.equal(200)
    expect(message).to.be.a('string')
    expect(message).to.equal('Organization updated successfully')
    expect(body).to.be.an('object')
  })

})
