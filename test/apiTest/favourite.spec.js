import chai from 'chai';
import http from 'chai-http';
import app from '../../server/app';
import models from '../../server/models/';

const expect = chai.expect;
chai.use(http);
let token;

describe('Favourites', () => {
  before((done) => {
    chai.request(app)
      .post('/api/v1/users/signin')
      .send({ email: 'chibuezeayogu@hotmail.com', password: 'Password1.@' })
      .end((err, res) => {
        token = res.body.token;
        done();
      });
  });

  describe('Get User Favourites Recipes', () => {
    it('should return an error message if no authorization token was found',
      (done) => {
        chai.request(app)
          .get('/api/v1/users/1/favouriteRecipes')
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body).to.have.keys(['status', 'message']);
            expect(res.body.status).to.eql('Failed');
            expect(res.body.message).to.eql('No token provided.');
            done();
          });
      });
    it('should return an error message if invalid user id is supplied',
      (done) => {
        chai.request(app)
          .get('/api/v1/users/e/favouriteRecipes')
          .set({ Authorization: token })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body).to.have.keys(['message']);
            expect(res.body.message).to.eql(['Please input a valid userId.']);
            done();
          });
      });
    it(`should return an error message if unauthenticated user tries to
      perform am action`, (done) => {
      chai.request(app)
        .get('/api/v1/users/5/favouriteRecipes')
        .set({ Authorization: token })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.have.keys(['message']);
          expect(res.body.message).to.eql('User is not Authorized!.');
          done();
        });
    });
  });

  describe('Add OR Remove Recipe from User Favourite', () => {
    it('should return an error message if no authorization token was found',
      (done) => {
        chai.request(app)
          .put('/api/v1/recipes/1/addOrRemoveFavourite')
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body).to.have.keys(['status', 'message']);
            expect(res.body.status).to.eql('Failed');
            expect(res.body.message).to.eql('No token provided.');
            done();
          });
      });
    it('should return an error message if invalid recipe id is supplied',
      (done) => {
        chai.request(app)
          .put('/api/v1/recipes/s/addOrRemoveFavourite')
          .set({ Authorization: token })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body).to.have.keys(['message']);
            expect(res.body.message).to.eql(['Please input a valid id.']);
            done();
          });
      });
    it('should return an error message if recipe was not found', (done) => {
      chai.request(app)
        .put('/api/v1/recipes/10/addOrRemoveFavourite')
        .set({ Authorization: token })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.have.keys(['message']);
          expect(res.body.message).to.eql('Recipe not found!');
          done();
        });
    });
    it(`should return a message if a user adds a recipe to his or
      her favourite`, (done) => {
      chai.request(app)
        .put('/api/v1/recipes/2/addOrRemoveFavourite')
        .set({ Authorization: token })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.keys(['message']);
          expect(res.body.message).to.eql('Added to your list of favourite');
          done();
        });
    });
    it(`should return found recipe if user has added recipe to
      his/her favourite`, (done) => {
      chai.request(app)
        .get('/api/v1/users/1/favouriteRecipes')
        .set({ Authorization: token })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
    it('should return a message if a user removes a recipe from his favourite',
      (done) => {
        chai.request(app)
          .put('/api/v1/recipes/2/addOrRemoveFavourite')
          .set({ Authorization: token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.have.keys(['message']);
            expect(res.body.message).to.eql(
              'Removed from your list of favourites'
            );
            done();
          });
      });
  });
});
