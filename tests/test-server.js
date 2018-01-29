var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app.js');

chai.use(chatHttp);

describe('users', function() {
    it('test de la route login ', function(done) {
        chai.request(server)
            .get('/login')
            .end(function(err, res){
                res.should.have.status(200);
                done();
            });
    });
}