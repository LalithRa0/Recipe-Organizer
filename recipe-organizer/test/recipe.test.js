// test/recipe.test.js
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server.js'; 
import { expect } from 'chai';
import User from '../models/user.js';
import Recipe from '../models/recipe.js';

chai.use(chaiHttp);

describe('Recipe', () => {
  let token;

  before(async () => {
    await User.sync({ force: true });
    await Recipe.sync({ force: true });

    const res = await chai.request(server)
      .post('/api/register')
      .send({
        username: 'testuser',
        password: 'password123'
      });

    const loginRes = await chai.request(server)
      .post('/api/login')
      .send({
        username: 'testuser',
        password: 'password123'
      });

    token = loginRes.body.token;
  });

  it('should add a recipe', (done) => {
    chai.request(server)
      .post('/api/recipes')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Recipe',
        ingredients: 'Test Ingredients',
        instructions: 'Test Instructions',
        category: 'Test Category',
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
