const chai = require('chai');
const { expect } = require('chai');
const request = require('supertest');
const app = require('../app');
const { Activity } = require('../database/models');

describe('[POST] /activities', ()=>{
    let token;

    before (async () => {
        const { body:res } = await request(app)
        .post('/auth/login')
        .set('Accept', 'application/json')
        .send({
            email: 'user1@mail.com',
            password: 'Pass*2022'
        })
        .expect('Content-Type', /json/)
        token = res.body.token
        console.log('token---->', token);
    });

    it('Activity created successfully',async () => {
        const { body } = await request(app).post('/activities')
        .send({
          name: 'Activity1',
          content: 'content of activity1',
          image: 'http://abc.com/img.jpg'
        })
        .set('Authorization', token)
        .set("Accept", "text/html; charset=utf-8")
        .expect("Content-Type", /json/)
        .expect(200)
        const { code, status, message, body: res } = body
        expect(code).to.be.a('number')
        expect(code).to.equal(200)
        expect(status).to.be.true
        expect(message).to.be.a('string')
        expect(res).to.be.an('object')
      });

    
});


