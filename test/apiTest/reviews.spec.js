import chai from 'chai';
import http from 'chai-http';
import app from '../../app';
import models from '../../server/models/';

const should = chai.should();
chai.use(http);

const expect = chai.expect;
chai.use(http);
let token;

describe('Reviews', () => {
  before((done) => {
    chai.request(app)
      .post('/api/v1/users/signin')
      .send({ email: 'chibuezeayogu@hotmail.com', password: 'Password1.@' })
      .end((err, res) => {
        token = res.body.token;
        done();
      });
  });
  describe('GET: /recipes/:id/reviews', () => {
    it('should return a message `No token provided.` if no authorization token was found', (done) => {
      chai.request(app)
        .get('/api/v1/recipes/3/reviews')
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.have.keys(['status', 'message']);
          expect(res.body.status).to.eql('Failed');
          expect(res.body.message).to.eql('No token provided.');
          done();
        });
    });
    it('should return a message `Please input a valid id.` if recipe id supplied is not of type integer', (done) => {
      chai.request(app)
        .get('/api/v1/recipes/s/reviews')
        .set({ Authorization: token })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.keys(['message']);
          expect(res.body.message).to.eql(['Please input a valid id.']);
          done();
        });
    });
    it('should return a message `Recipe not found` if recipe is not found', (done) => {
      chai.request(app)
        .get('/api/v1/recipes/5/reviews')
        .set({ Authorization: token })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.have.keys(['message']);
          expect(res.body.message).to.eql('Recipe not found');
          done();
        });
    });
    it('should return a message if recipe has not been recviewd', (done) => {
      chai.request(app)
        .get('/api/v1/recipes/5/reviews')
        .set({ Authorization: token })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.have.keys(['message']);
          done();
        });
    });
  });
  describe('POST: /recipes/:id/reviews', () => {
    it('should return a message `No token provided.` if no authorization token was found', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/3/reviews')
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.have.keys(['status', 'message']);
          expect(res.body.status).to.eql('Failed');
          expect(res.body.message).to.eql('No token provided.');
          done();
        });
    });
    it('should return a message `Please input a valid id.` if recipe id supplied is not of type integer', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/s/reviews')
        .set({ Authorization: token })
        .send({ comment: 'nice recipe' })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.keys(['message']);
          expect(res.body.message).to.eql(['Please input a valid id.']);
          done();
        });
    });
    it('should return a message `Recipe not found` if recipe is not found', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/5/reviews')
        .set({ Authorization: token })
        .send({ comment: 'nice recipe' })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.have.keys(['message']);
          expect(res.body.message).to.eql('Recipe not found');
          done();
        });
    });
    it('should return a message if comment is not supplied', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/3/reviews')
        .set({ Authorization: token })
        .send({ comment: '' })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.keys(['message']);
          expect(res.body.message).to.eql(['comment is required', 'comment should be at least 5 character long without leading space']);
          done();
        });
    });
    it('should return a message `comment should be at least 5 character long without leading space` if comment is supplied but didn\'t meet the required length', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/3/reviews')
        .set({ Authorization: token })
        .send({ comment: 'nice' })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.keys(['message']);
          expect(res.body.message).to.eql(['comment should be at least 5 character long without leading space']);
          done();
        });
    });
    it('should return a message if comment posted successfully', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/3/reviews')
        .set({ Authorization: token })
        .send({ comment: 'nice recipe' })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.keys(['message', 'review']);
          expect(res.body.message).to.eql('Comment Posted');
          done();
        });
    });
  });
});
