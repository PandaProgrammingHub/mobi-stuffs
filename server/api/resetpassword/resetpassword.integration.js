'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newResetpassword;

describe('Resetpassword API:', function() {
  describe('GET /api/resetpassword', function() {
    var resetpasswords;

    beforeEach(function(done) {
      request(app)
        .get('/api/resetpassword')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          resetpasswords = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(resetpasswords).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/resetpassword', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/resetpassword')
        .send({
          name: 'New Resetpassword',
          info: 'This is the brand new resetpassword!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newResetpassword = res.body;
          done();
        });
    });

    it('should respond with the newly created resetpassword', function() {
      expect(newResetpassword.name).to.equal('New Resetpassword');
      expect(newResetpassword.info).to.equal('This is the brand new resetpassword!!!');
    });
  });

  describe('GET /api/resetpassword/:id', function() {
    var resetpassword;

    beforeEach(function(done) {
      request(app)
        .get(`/api/resetpassword/${newResetpassword._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          resetpassword = res.body;
          done();
        });
    });

    afterEach(function() {
      resetpassword = {};
    });

    it('should respond with the requested resetpassword', function() {
      expect(resetpassword.name).to.equal('New Resetpassword');
      expect(resetpassword.info).to.equal('This is the brand new resetpassword!!!');
    });
  });

  describe('PUT /api/resetpassword/:id', function() {
    var updatedResetpassword;

    beforeEach(function(done) {
      request(app)
        .put(`/api/resetpassword/${newResetpassword._id}`)
        .send({
          name: 'Updated Resetpassword',
          info: 'This is the updated resetpassword!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedResetpassword = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedResetpassword = {};
    });

    it('should respond with the updated resetpassword', function() {
      expect(updatedResetpassword.name).to.equal('Updated Resetpassword');
      expect(updatedResetpassword.info).to.equal('This is the updated resetpassword!!!');
    });

    it('should respond with the updated resetpassword on a subsequent GET', function(done) {
      request(app)
        .get(`/api/resetpassword/${newResetpassword._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let resetpassword = res.body;

          expect(resetpassword.name).to.equal('Updated Resetpassword');
          expect(resetpassword.info).to.equal('This is the updated resetpassword!!!');

          done();
        });
    });
  });

  describe('PATCH /api/resetpassword/:id', function() {
    var patchedResetpassword;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/resetpassword/${newResetpassword._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Resetpassword' },
          { op: 'replace', path: '/info', value: 'This is the patched resetpassword!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedResetpassword = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedResetpassword = {};
    });

    it('should respond with the patched resetpassword', function() {
      expect(patchedResetpassword.name).to.equal('Patched Resetpassword');
      expect(patchedResetpassword.info).to.equal('This is the patched resetpassword!!!');
    });
  });

  describe('DELETE /api/resetpassword/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/resetpassword/${newResetpassword._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when resetpassword does not exist', function(done) {
      request(app)
        .delete(`/api/resetpassword/${newResetpassword._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
