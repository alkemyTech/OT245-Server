const { expect }= require('chai');
const request = require("supertest");
const app = require('../app')
const { Member } = require('../database/models')

const member = [
  {
  name: 'test1',
  image: 'link',
}
]

let token
describe('Members', () => {
    
    before(async () => {
        request(app)
            .post('/auth/login')
            .send({
                email: 'nicolmccann3@gmail.com',
                password: 'Contra*77'
              })
            .end((err, res) => {
                expect(res).to.have.property('status', 200)
                expect(res.body.body).to.have.property('token')
                token = res.body.body.token 
              })
              await Member.bulkCreate(member)
			})
      after(async () => {
        await Member.destroy({ where: { name: 'test1' } })
      }
      )

describe('GET /members', () => {
    it('should get a list of all members', async () => {
        const res = await request(app)
            .get('/members')
            .set('Authorization',`${token}`)
            .expect(200)
            expect(res.body.body).to.have.property('members').to.be.instanceOf(Array)
    })
})

let memberId
  describe('POST /members', () => {
    it('should create a new member', async () => {
      const res = await request(app)
        .post('/members')
        .set('Authorization',`${token}`)
        .send({
            name: 'test',
            image: 'link',
        })
        .expect(200)
        expect(res.body.body).to.have.property('name', 'test')
        expect(res.body.body).to.have.property('image', 'link')
        memberId = res.body.body.id
    })
  })

describe('PUT /members/:id', () => {
    it('should update a member', async () => {
      const res = await request(app)
        .put('/members/'+memberId)
        .set('Authorization', `${token}`)
        .send({
            name: 'test',
            image: 'Image 3'
          })
      .expect(200)
      expect(res.body.body).to.have.property('name', 'test')
      expect(res.body.body).to.have.property('image', 'Image 3')
    })
  })

describe('DELETE /members/:id', () => {
  it('should delete a member', async () => {
    const res = await request(app)
      .delete('/members/'+memberId)
      .set('Authorization',`${token}`)
      expect(res).to.have.property('status', 200)
      expect(res.body).to.have.property('body')
  })
})


// ERRORES 
describe('GET /members without token', () => {
  it('should return a 403 error', async () => {
    const res = await request(app)
    .get('/members')
    expect(res).to.have.property('status', 403)
  })
})
describe('POST /members with invalid fields', () => {
      it('should return a 400 error', async () => {
        const res = await request(app)
          .post('/members')
          .set('Authorization',`${token}`)
          .send({
            name: '',
            image: 'link',
            description:'test invalid fields'
          }) 
        expect(res).to.have.property('status', 400)
      })
    }
    )
    
    describe('DELETE /members/:id no exist', () => {
      it('should return a 404 error', async () => {
          const res = await request(app)
              .delete('/members/200')
              .set('Authorization',`${token}`)
          expect(res).to.have.property('status', 404)
          }
      )
    })


})

