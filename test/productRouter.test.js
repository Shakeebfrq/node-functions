const chai = require('chai');
const chaiHttp = require('chai-http');
const { describe, it } = require('mocha');
const app = require('../app')
const productsRouter = require('../routers/productsRouter');
const myProducts = require('../allproducts.json');

chai.use(chaiHttp);
const { expect } = chai;

describe('GET /api/products', () => {
  it('should return success and data if myProducts is defined', (done) => {
    chai.request(app)
      .get('/api/products')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal('success');
        expect(res.body.data).to.be.an('array');


        expect(res.body.data[0]).to.have.property('id');
        expect(res.body.data[0]).to.have.property('name');
        expect(res.body.data[0]).to.have.property('price');
        expect(res.body.data[0]).to.have.property('category');

        done();
      });
  });
});


describe('GET /api/products/:id', () => {
    it('should return success and data if a valid id is provided', (done) => {
      const validProductId = 1; 
  
      chai.request(app)
        .get(`/api/products/${validProductId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.equal('success');
          expect(res.body.data).to.be.an('object');
  
          
          expect(res.body.data).to.have.property('id');
          expect(res.body.data).to.have.property('name');
          expect(res.body.data).to.have.property('price');
          expect(res.body.data).to.have.property('category');
  
          done();
        });
    });
  
    it('should return 404 if an invalid id is provided', (done) => {
      const invalidProductId = 999; 
  
      chai.request(app)
        .get(`/api/products/${invalidProductId}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('Invalid Id');
  
          done();
        });
    });
  });
