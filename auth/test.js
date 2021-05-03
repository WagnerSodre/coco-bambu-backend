const sinon = require('sinon');
const { expect } = require('chai');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

const auth = require('./auth');
const User = require('../models/user');

dotenv.config();

describe('Login', function() {
  describe('When a invalid user tries to login', function() {
    const sandbox = sinon.createSandbox();
    it('should return an error', function() {
      sandbox.stub(User, 'findOne').rejects(new Error());
      let req = {
        'body': {
          'user': 'test',
          'pwd': 'wrong'
        }
      };
      let res = {
        send: function(){ },
        json: function(err){
          expect(err.message).to.equal('Unauthorized');
        },
        status: function(responseStatus) {
          expect(responseStatus).to.equal(401);
          return this; 
        }
      };
      auth.login(req, res);
      // Restore sandbox.
      sandbox.restore();
    });
  });

  describe('When a valid user tries to login', function() {
    const sandbox = sinon.createSandbox();
    it('should return a token', function() {
      const mockUser = { _id: '5e684ebacb19f70020661f44', name: 'test', password: 'test' };
      sandbox.stub(User, 'findOne').returns(Promise.resolve(mockUser));
      let req = {
        'body': {
          'user': 'test',
          'pwd': 'test'
        }
      };
      let res = {
        send: function(){ },
        json: function(res){
          expect(res.auth).to.equal(true);
        },
        status: function(responseStatus) {
          expect(responseStatus).to.equal(200);
          return this; 
        }
      };
      auth.login(req, res);
      // Restore sandbox.
      sandbox.restore();
    });
  });
});

describe('Logout', function() {
  describe('When a user tries to logout', function() {
    it('should clean the token', function() {
      let req = {};
      let res = {
        send: function(){ },
        json: function(res){
          expect(res.auth).to.equal(true);
        },
        status: function(responseStatus) {
          expect(responseStatus).to.equal(200);
          return this; 
        }
      };
      auth.logout(req, res);
    });
  });
});