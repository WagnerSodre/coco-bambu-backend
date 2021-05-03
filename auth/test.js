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

describe('verifyJWT', function() {
  describe('When a user tries to login without a token', function() {
    it('should give a no token error', function() {
      let req = {
        'headers': {}
      };
      let res = {
        send: function(){ },
        json: function(err){
          expect(err.message).to.equal("No token provided");
        },
        status: function(responseStatus) {
          expect(responseStatus).to.equal(401);
          return this; 
        }
      };
      let valid = false;
      let next = function() {
        valid = true;
      }
      auth.verifyJWT(req, res, next);
      expect(valid).to.equal(false);
    });
  });

  describe('When a user tries to login with a invalid token', function() {
    it('should give a invalid token error', function() {
      let req = {
        'headers': {
          'x-access-token': '1'
        }
      };
      let res = {
        send: function(){ },
        json: function(err){
          expect(err.message).to.equal("Failed to authenticate token");
        },
        status: function(responseStatus) {
          expect(responseStatus).to.equal(500);
          return this; 
        }
      };
      let valid = false;
      let next = function() {
        valid = true;
      }
      auth.verifyJWT(req, res, next);
      expect(valid).to.equal(false);
    });
  });
  
  describe('When a user tries to login with a valid token', function() {
    it('should pass the validation', function() {
      let id = 1;
      const token = jwt.sign({ id }, process.env.SECRET, {
        expiresIn: 300 // expires in 5min
      });
      req = {
        'headers': {
          'x-access-token': token
        }
      };
      res = {
        send: function(){ },
        status: function() {
            return this; 
        }
      };
      let valid = false;
      let next = function() {
        valid = true;
      }
      auth.verifyJWT(req, res, next);
      expect(valid).to.equal(true);
    });
  });
});