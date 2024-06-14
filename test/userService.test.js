const sinon = require('sinon');
const { expect } = require('chai');
const User = require('../mc-auth/userModel.js');
const Token = require('../mc-auth/tokenModel.js');
const userService = require('../mc-auth/userService.js');


describe('User Service', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('REGISTER should register a user', async () => {
        const stubValue = { username: 'user1', password: 'password1' };
        const saveStub = sinon.stub(User.prototype, 'save').returns(stubValue);
        await userService.register('user1', 'password1');
        expect(saveStub.calledOnce).to.be.true;
    });

    it('LOGIN should log in a user and return a token', async () => {
        const stubValue = { _id: 'someId', username: 'user1', password: 'password1' };
        const findOneStub = sinon.stub(User, 'findOne').returns(stubValue);
        const bcryptCompareStub = sinon.stub(require('bcryptjs'), 'compare').returns(true);
        const jwtSignStub = sinon.stub(require('jsonwebtoken'), 'sign').returns('someToken');
        const saveTokenStub = sinon.stub(Token.prototype, 'save').returnsThis(); // Добавьте эту строку
    
        const token = await userService.login('user1', 'password1');
    
        expect(token).to.equal('someToken');
        expect(findOneStub.calledOnce).to.be.true;
        expect(bcryptCompareStub.calledOnce).to.be.true;
        expect(jwtSignStub.calledOnce).to.be.true;
        expect(saveTokenStub.calledOnce).to.be.true; // И эту строку
    });
});
