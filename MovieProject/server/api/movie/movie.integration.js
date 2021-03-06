'use strict';

var app = require('../..');
import request from 'supertest';

var newMovie;

describe('Movie API:', function() {

  describe('GET /api/movie', function() {
    var movies;

    beforeEach(function(done) {
      request(app)
        .get('/api/movie')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          movies = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(movies).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/movie', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/movie')
        .send({
          name: 'New Movie',
          info: 'This is the brand new movie!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newMovie = res.body;
          done();
        });
    });

    it('should respond with the newly created movie', function() {
      expect(newMovie.name).to.equal('New Movie');
      expect(newMovie.info).to.equal('This is the brand new movie!!!');
    });

  });

  describe('GET /api/movie/:id', function() {
    var movie;

    beforeEach(function(done) {
      request(app)
        .get('/api/movie/' + newMovie._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          movie = res.body;
          done();
        });
    });

    afterEach(function() {
      movie = {};
    });

    it('should respond with the requested movie', function() {
      expect(movie.name).to.equal('New Movie');
      expect(movie.info).to.equal('This is the brand new movie!!!');
    });

  });

  describe('PUT /api/movie/:id', function() {
    var updatedMovie;

    beforeEach(function(done) {
      request(app)
        .put('/api/movie/' + newMovie._id)
        .send({
          name: 'Updated Movie',
          info: 'This is the updated movie!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedMovie = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedMovie = {};
    });

    it('should respond with the updated movie', function() {
      expect(updatedMovie.name).to.equal('Updated Movie');
      expect(updatedMovie.info).to.equal('This is the updated movie!!!');
    });

  });

  describe('DELETE /api/movie/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/movie/' + newMovie._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when movie does not exist', function(done) {
      request(app)
        .delete('/api/movie/' + newMovie._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
