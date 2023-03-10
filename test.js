const { expect } = require('chai');
const parseDate = require('./index');

describe('parseDate function', () => {
    it('should parse dd MMM yyyy HH:mm:ss.SSS z format', () => {
        const dateString = '01 May 2022 15:30:00.000 GMT';
        const dateObject = parseDate(dateString);
        expect(dateObject.date.toISOString()).to.equal('2022-05-01T15:30:00.000Z');
    });
    it('should parse YYYY-MM-DD HH:mm:ss.SSS format', () => {
        const dateString = '2022-05-01 15:30:00';
        const dateObject = parseDate(dateString);
        expect(dateObject.date.toISOString()).to.equal('2022-05-01T15:30:00.000Z');
    });

    it('should parse MM/DD/YYYY HH:mm:ss format', () => {
        const dateString = '05/01/2022 15:30:00';
        const dateObject = parseDate(dateString);
        expect(dateObject.date.toISOString()).to.equal('2022-05-01T15:30:00.000Z');
    });

    it('should throw an error for invalid input', () => {
        const dateString = 'invalid date string';
        expect(() => parseDate(dateString)).to.throw();
    });
});
