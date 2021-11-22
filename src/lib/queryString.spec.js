const {queryString} = require('./queryString');

describe('Object to query string', () => {
    it('should create a valid query string when object is provided', () => {
        const obj = { 
            name: 'Fernando',
            profession : 'developer'
        }

       expect(queryString(obj)).toBe('name=Fernando&profession=developer')
    });
});