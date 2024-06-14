const chai = require('chai');
const expect = chai.expect;
const { processChadoData, findBracketsContent, fixJson } = require('../mc-chado/chadoService');

describe('Chado Service', function() {
    describe('findBracketsContent', function() {
        it('should return content between brackets', function() {
            const result = findBracketsContent('Hello {world}');
            expect(result).to.equal('{world}');
        });

        it('should return error message if no brackets', function() {
            const result = findBracketsContent('Hello world');
            expect(result).to.equal('Фигурные скобки не найдены или между ними нет содержимого');
        });
    });

    describe('fixJson', function() {
        it('should fix json string', function() {
            const result = fixJson('{ "name": "Maxim"');
            expect(result).to.equal('{ "name": "Maxim"}');
        });

        it('should throw error if extra closing bracket', function() {
            expect(() => fixJson('} "name": "Maxim"')).to.throw('Некорректный JSON: лишняя закрывающая скобка');
        });
    });
    
});
