var chai = require('chai');
const expect = require('chai').expect;
const Sequelize = require('sequelize');
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


describe('users', () => {
   let database;
   let User;

    before(async () => {
        database = new Sequelize('epc', 'root', '', {
            host: 'localhost',
            dialect: 'mysql'
        });
        User = database.define('user',{
            id_user: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            username: {
                type: Sequelize.STRING,
                unique: true
            },
            password: {
                type: Sequelize.STRING
            },
            firstname: {
                type: Sequelize.STRING
            },
            lastname: {
                type: Sequelize.STRING
            }
        }, {
            tableName : 'user',
            createdAt : 'createdAt',
            updatedAt : 'updatedAt',
            deletedAt : false,
            freezeTableName: true
        });
    })

    beforeEach(async () => {
        await User.sync();
        await User.create({
            username: 'jaja',
            password: 'spec',
            firstname: 'val',
            lastname: 'jeanval'

        });
    })

    afterEach(async () => {
        await User.drop();
    })

    describe('#find()', () => {
        it('Utilisateur trouvé ', async () => {
            const user = await User.findOne({ where: { username: 'jaja' }})
            expect(user).to.be.a('object');
            expect(user).to.have.property('username');
            expect(user).to.have.property('password');
            expect(user).to.have.property('firstname');
            expect(user).to.have.property('lastname');
            expect(user.username).to.equal('jaja');
            console.log("#### TESTS ####");
        });
    });


});