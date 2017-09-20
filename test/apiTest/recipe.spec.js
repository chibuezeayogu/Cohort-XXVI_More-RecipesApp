import app from '../../app';
import chai from 'chai';
import http from 'chai-http';
import models from '../../server/models/';

const should  = chai.should();
 chai.use(http);

const expect = chai.expect;
chai.use(http);
let token;
    
    describe('Recipes', () => {
      before((done) => {
        chai.request(app)
          .post('/api/v1/users/signin')
          .send({ email: 'chibuezeayogu@hotmail.com', password: 'computer123' })
          .end((err, res) => {
            token = res.body.token;
            done();
          });
      });
      describe('POST: /api/v1/recipes', () => {
        it('should post a new recipe given title, description, ingredients, and procedures', (done) => {
          chai.request(app)
          .post('/api/v1/recipes')
          .set({ Authorization: token })
          .send({ title: 'egusi soup', description: 'how to cook', ingredients: 'pepper, salt, egusi', procedures: 'wash, fry, cook' })
          .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body).to.have.keys(['message', 'recipeInfo']);
            expect(res.body.message).to.eql('Added successfully');
            done();
          });
        });
      it('should return a message if title is empty', (done) => {
        chai.request(app)
        .post('/api/v1/recipes')
        .set({ Authorization: token })
        .send({ title: '', description: 'how to cook', ingredients: 'pepper, salt, egusi', procedures: 'wash, fry, cook' })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.keys(['message']);
          expect(res.body.message).to.eql(['title is required']);
          done();
        });
      });
      it('should return a message if description is empty', (done) => {
        chai.request(app)
        .post('/api/v1/recipes')
        .set({ Authorization: token })
        .send({ title: 'egusi soup', description: '', ingredients: 'pepper, salt, egusi', procedures: 'wash, fry, cook' })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.keys(['message']);
          expect(res.body.message).to.eql(['description is required']);
          done();
        });
      });
        it('should return a message if ingredients is empty', (done) => {
          chai.request(app)
          .post('/api/v1/recipes')
          .set({ Authorization: token })
          .send({ title: 'egusi soup', description: 'how to cook', ingredients: '', procedures: 'wash, fry, cook' })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body).to.have.keys(['message']);
            expect(res.body.message).to.eql(['ingredients is required']);
            done();
          });
        });
        it('should return a messsage if procedures is empty', (done) => {
          chai.request(app)
          .post('/api/v1/recipes')
          .set({ Authorization: token })
          .send({ title: 'egusi soup', description: 'how to cook', ingredients: 'pepper, salt, egusi', procedures: '' })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body).to.have.keys(['message']);
            expect(res.body.message).to.eql(['procedures is required']);
            done();
          });
        });
        it('should post a new recipe given title, description, ingredients, and procedures', (done) => {
          chai.request(app)
          .post('/api/v1/recipes')
          .set({ Authorization: token })
          .send({ title: 'egusi soup', description: 'how to cook', ingredients: 'pepper, salt, egusi', procedures: 'wash, fry, cook' })
          .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body).to.have.keys(['message', 'recipeInfo']);
            expect(res.body.message).to.eql('Added successfully');
            done();
          });
        });
    });
    describe('GET: /recipes/:id', () => {
      it('should return a message if invalid retrive id is supplied', (done) => {
        chai.request(app)
        .get('/api/v1/recipes/s')
        .set({ Authorization: token })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.keys(['message']);
          expect(res.body.message).to.eql(['Please input a valid id.']);
          done();
        });
      });
      it('should return a message if recipe id dosen\'t exist', (done) => {
        chai.request(app)
        .get('/api/v1/recipes/5')
        .set({ Authorization: token })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.have.keys(['message']);
          expect(res.body.message).to.eql('Recipe not found');
          done();
        });
      });
    });
    describe('PUT: /recipes/:id', () => {
      it('should return a message if invalid retrive id is supplied', (done) => {
        chai.request(app)
        .put('/api/v1/recipes/s')
        .set({ Authorization: token })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.keys(['message']);
          expect(res.body.message).to.eql(['Please input a valid id.']);
          done();
        });
      });
      it('should return a message if a user tires to modify a recipe he/she didn\'t add', (done) => {
        chai.request(app)
        .put('/api/v1/recipes/2')
        .set({ Authorization: token })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.have.keys(['message']);
          expect(res.body.message).to.eql('You can only update you recipe');
          done();
        });
      });
    });
    describe('DELETE: /recipes/:id', () => {
      it('should return a message if invalid retrive id is supplied', (done) => {
        chai.request(app)
        .del('/api/v1/recipes/s')
        .set({ Authorization: token })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.keys(['message']);
          expect(res.body.message).to.eql(['Please input a valid id.']);
          done();
        });
      });
      it('should return a message if a user tires to delete a recipe he/she didn\'t add', (done) => {
        chai.request(app)
        .del('/api/v1/recipes/2')
        .set({ Authorization: token })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.have.keys(['message']);
          expect(res.body.message).to.eql('You can only delete you recipe');
          done();
        });
      });
    });
 });
  