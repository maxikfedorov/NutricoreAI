const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const axios = require('axios');
const AIDietResponse = require('../mc-perplexity/perplexityModel');
const getPerplexityResponse = require('../mc-perplexity/perplexityService'); 

describe('getPerplexityResponse', function() {
    let axiosPostStub, saveStub;

    beforeEach(function() {
        axiosPostStub = sinon.stub(axios, 'post');
        saveStub = sinon.stub(AIDietResponse.prototype, 'save');
    });

    afterEach(function() {
        sinon.restore();
    });

    it('should return perplexity response and save it to database', async function() {
        const mockResponse = {
            data: {
                choices: [
                    {
                        message: {
                            content: 'Test content'
                        }
                    }
                ]
            }
        };
        axiosPostStub.resolves(mockResponse);
        saveStub.resolves();

        const result = await getPerplexityResponse();

        expect(result).to.equal(mockResponse.data.choices[0].message.content);
        expect(axiosPostStub.calledOnce).to.be.true;
        expect(saveStub.calledOnce).to.be.true;
    });

    it('should throw an error if axios post request fails', function() {
        const mockError = new Error('Axios error');
        axiosPostStub.rejects(mockError);

        return expect(getPerplexityResponse()).to.be.rejectedWith(mockError);
    });

    it('should throw an error if saving to database fails', function() {
        const mockResponse = {
            data: {
                choices: [
                    {
                        message: {
                            content: 'Test content'
                        }
                    }
                ]
            }
        };
        const mockError = new Error('Database error');
        axiosPostStub.resolves(mockResponse);
        saveStub.rejects(mockError);

        return expect(getPerplexityResponse()).to.be.rejectedWith(mockError);
    });
});
