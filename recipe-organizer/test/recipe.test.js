import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server.js';
import jwt from 'jsonwebtoken';

chai.use(chaiHttp);
const expect = chai.expect;

describe('Recipe', () => {
  let token;

  before((done) => {
    chai.request(server)
      .post('/api/users/login')
      .send({
        username: 'testuser',
        password: 'password123'
      })
      .end((err, res) => {
        token = res.body.token; // Assuming the token is in the response body
        done();
      });
  });

  it('should add a recipe', (done) => {
    chai.request(server)
      .post('/api/recipes')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Recipe',
        ingredients: 'Ingredients',
        instructions: 'Instructions',
        category: 'Category',
        imageUrl: 'http://example.com/image.jpg'
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });

  it('should get all recipes', (done) => {
    chai.request(server)
      .get('/api/recipes')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
