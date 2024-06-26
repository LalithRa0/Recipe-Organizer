import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server.js';
import { expect } from 'chai';
import User from '../models/user.js';

chai.use(chaiHttp);

describe('User', () => {
  before(async () => {
    await User.sync({ force: true });
  });

  it('should register a user', (done) => {
    chai.request(server)
      .post('/api/register')
      .send({ username: 'testuser', password: 'password123' })
      .end((err, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });

  it('should login a user', (done) => {
    chai.request(server)
      .post('/api/login')
      .send({ username: 'testuser', password: 'password123' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
