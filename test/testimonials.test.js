const { expect }= require('chai');
const request = require("supertest");
const app = require('../app')
const { Testimonial } = require('../database/models')

const testimonial = [
  {
  name: 'testing testimonial',
  image: 'link',
  "content": "the content test"
}
]

let token, testimonialId
describe('Testimonials', () => {
    
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
              await Testimonial.bulkCreate(testimonial)
			})
      after(async () => {
        await Testimonial.destroy({ where: { name: 'testing testimonial' } })
      })
      

describe('GET /testimonials', () => {
    it('should get a list of all testimonials', async () => {
        const {body} = await request(app)
            .get('/testimonials')
            .set('Accept', 'aplication/json')
            .expect('Content-type',/json/)
            const { code, status, message, body: response } = body

            expect(code).to.be.a('number');
            expect(code).to.equal(200);
            expect(status).to.be.a('boolean');
            expect(status).to.equal(true);
            expect(message).to.be.a('string');
            expect(message).to.equal('Testimonials obtained successfully');
            expect(response).to.be.a('object'); 
    })
})

  describe('POST /testimonials', () => {
    it('should create a new testimonial', async () => {
      const {body} = await request(app)
        .post('/testimonials')
        .set('Authorization',`${token}`)
        .set('Accept', 'aplication/json')
        .send({
            name: 'test',
            image: 'link',
            "content": "text"
        })
            .expect('Content-type',/json/)
            const { code, status, message, body: response } = body

            expect(code).to.be.a('number');
            expect(code).to.equal(200);
            expect(status).to.be.a('boolean');
            expect(status).to.equal(true);
            expect(message).to.be.a('string');
            expect(message).to.equal('Testimonial created successfully');
            expect(response).to.be.a('object'); 
            testimonialId = response.id
    })
  })

describe('PUT /testimonials/:id', () => {
    it('should update a testimonial', async () => {
      const {body} = await request(app)
        .put('/testimonials/'+testimonialId)
        .set('Authorization', `${token}`)
        .set('Accept', 'aplication/json')
        .send({
            name: 'test updated',
            image: 'Image',
            content: "text"
          })
          .expect('Content-type','application/json; charset=utf-8')
          const { code, status, message, body: response } = body

          expect(code).to.be.a('number');
          expect(code).to.equal(200);
          expect(status).to.be.a('boolean');
          expect(status).to.equal(true);
          expect(message).to.be.a('string');
          expect(message).to.equal('Testimonial updated successfully');
          expect(response).to.be.a('object'); 
    })
  })

describe('DELETE /testimonials/:id', () => {
  it('should delete a testimonial', async () => {
    const {body} = await request(app)
      .delete('/testimonials/'+testimonialId)
      .set('Authorization',`${token}`)
      .expect('Content-type','application/json; charset=utf-8')
          const { code, status, message, body: response } = body

          expect(code).to.be.a('number');
          expect(code).to.equal(200);
          expect(status).to.be.a('boolean');
          expect(status).to.equal(true);
          expect(message).to.be.a('string');
          expect(message).to.equal('Testimonial deleted successfully'); 
          expect(response).to.equal(1)
  })
})

describe('DELETE /testimonials without token', () => {
  it('should return a 403 error', async () => {
    const res = await request(app)
    .delete('/testimonials/'+testimonialId)
    expect(res).to.have.property('status', 403)
  })
})
describe('POST /testimonials with invalid fields', () => {
      it('should return a 400 error', async () => {
        const res = await request(app)
          .post('/testimonials')
          .set('Authorization',`${token}`)
          .set('Accept', 'aplication/json')
          .send({
            name: '',
            image: 'link',
            content:''
          }) 
        expect(res).to.have.property('status', 400)
      })
    }
    )
    
})

