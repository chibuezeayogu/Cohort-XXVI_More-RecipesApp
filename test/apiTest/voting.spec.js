import chai from 'chai';
import http from 'chai-http';
import app from '../../app';
import models from '../../server/models/';

const expect = chai.expect;
chai.use(http);
let token;

describe('Votings', () => {
  before((done) => {
    chai.request(app)
      .post('/api/v1/users/signin')
      .send({ email: 'chibuezeayogu@hotmail.com', password: 'Password1.@' })
      .end((err, res) => {
        token = res.body.token;
        done();
      });
  });
  describe('PUT: /api/v1/recipes/:id/upvote', () => {
    it('should return a message `No token provided.` if no authorization token was found', (done) => {
      chai.request(app)
        .put('/api/v1/recipes/1/upvote')
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
        .put('/api/v1/recipes/s/upvote')
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
        .put('/api/v1/recipes/20/upvote')
        .set({ Authorization: token })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.have.keys(['message']);
          expect(res.body.message).to.eql('Recipe not found');
          done();
        });
    });
    it('should return a message `voting recorded` if a user upvotes a recipe', (done) => {
      chai.request(app)
        .put('/api/v1/recipes/3/upvote')
        .set({ Authorization: token })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.keys(['message', 'recipe']);
          expect(res.body.message).to.eql('voting recorded');
          done();
        });
    });
    it('should return a message `voting removed` if a user tries to upvote a recipe he/she just upvoted', (done) => {
      chai.request(app)
        .put('/api/v1/recipes/3/upvote')
        .set({ Authorization: token })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.keys(['message', 'recipe']);
          expect(res.body.message).to.eql('voting removed');
          done();
        });
    });
    it('should return a message `voting recorded` if a user upvotes a recipe', (done) => {
      chai.request(app)
        .put('/api/v1/recipes/3/upvote')
        .set({ Authorization: token })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.keys(['message', 'recipe']);
          expect(res.body.message).to.eql('voting recorded');
          done();
        });
    });
    it('should return a message `voting recorded` if a user downvotes a recipe he/she previously upvoted', (done) => {
      chai.request(app)
        .put('/api/v1/recipes/3/downvote')
        .set({ Authorization: token })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.keys(['message', 'recipe']);
          expect(res.body.message).to.eql('voting recorded');
          done();
        });
    });
  });
  describe('GET: /api/v1/recipes/mostupvote', () => {
    it('should return a message `No token provided.` if no authorization token was found', (done) => {
      chai.request(app)
        .get('/api/v1/recipes/mostupvote')
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.have.keys(['status', 'message']);
          expect(res.body.status).to.eql('Failed');
          expect(res.body.message).to.eql('No token provided.');
          done();
        });
    });
    it('should return recipes with the most upvotes', (done) => {
      chai.request(app)
        .get('/api/v1/recipes/mostupvote')
        .set({ Authorization: token })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.keys(['recipe']);
          done();
        });
    });
  });
  describe('PUT: /api/v1/recipes/:id/downvote', () => {
    it('should return a message `No token provided.` if no authorization token was found', (done) => {
      chai.request(app)
        .put('/api/v1/recipes/3/downvote')
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
        .put('/api/v1/recipes/s/downvote')
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
        .put('/api/v1/recipes/10/downvote')
        .set({ Authorization: token })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.have.keys(['message']);
          expect(res.body.message).to.eql('Recipe not found');
          done();
        });
    });
    it('should return a message `voting recorded` if a user upvotes a recipe', (done) => {
      chai.request(app)
        .put('/api/v1/recipes/3/upvote')
        .set({ Authorization: token })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.keys(['message', 'recipe']);
          expect(res.body.message).to.eql('voting recorded');
          done();
        });
    });
    it('should return a message `voting recorded` if a user downvotes a recipe', (done) => {
      chai.request(app)
        .put('/api/v1/recipes/3/downvote')
        .set({ Authorization: token })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.keys(['message', 'recipe']);
          expect(res.body.message).to.eql('voting recorded');
          done();
        });
    });
    it('should return a message `voting removed` if a user tries to downvote a recipe he/she just downvoted', (done) => {
      chai.request(app)
        .put('/api/v1/recipes/3/downvote')
        .set({ Authorization: token })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.keys(['message', 'recipe']);
          expect(res.body.message).to.eql('voting removed');
          done();
        });
    });
  });
});
