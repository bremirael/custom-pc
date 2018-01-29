var chai = require('chai');
var expect = require('chai').expect;
var chaiHttp = require('chai-http');
var server = require('../app.js');
var should = require('chai').should();

var assert = require('chai').assert,
    question = undefined,
    answer = 42;

describe('Question of Life and the Universe', function() {
    it('answer to this undefined question should be 42', function(done) {
        assert.isUndefined(question, 'Answer is 42, but what is the question');
        assert.equal(answer, 42);
        done();
    });
});