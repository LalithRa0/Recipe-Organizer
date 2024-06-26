import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server.js';

const should = chai.should();
chai.use(chaiHttp);

describe('User', () => {
  before((done) => {
    // Perform any setup or cleanup before the tests run
    done();
  });

  it('should register a user', (done) => {
    chai.request(server)
      .post('/register')
      .send({ username: 'testuser', password: 'password123' })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('User successfully registered');
        done();
      });
  });

  it('should login a user', (done) => {
    chai.request(server)
      .post('/login')
      .send({ username: 'testuser', password: 'password123' })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('token');
        done();
      });
  });
});
