const { queryString, parse } = require('./queryString');

describe('Object to query string', () => {
  it('should create a valid query string when object is provided', () => {
    const obj = {
      name: 'Fernando',
      profession: 'developer',
    };

    expect(queryString(obj)).toBe('name=Fernando&profession=developer');
  });

  it('should create a valid query string even an array is passed as value ', () => {
    const obj = {
      name: 'Fernando',
      abilities: ['JS', 'TDD'],
    };
    expect(queryString(obj)).toBe('name=Fernando&abilities=JS,TDD');
  });

  it('should throw an error when an object is passed as value', () => {
    const obj = {
      name: 'Fernando',
      abilities: {
        fisrt: 'JS',
        second: 'TDDD',
      },
    };

    expect(() => {
      queryString(obj);
    }).toThrowError();
  });
});

describe('Query string to object', () => {
  it('should convert query string to object ', () => {
    const qs = 'name=Fernando&profession=developer';
    //parse(qs);
    expect(parse(qs)).toEqual({
      name: 'Fernando',
      profession: 'developer',
    });
  });

  it('should convert a query of a single key-value', () => {
    const qs = 'name=Fernando';
    expect(parse(qs)).toEqual({
      name: 'Fernando',
    });
  });

  it('should convert a query string to an object taking care of comma separated values ', () => {
    const qs = 'name=Fernando&abilities=JS,TDD';
    expect(parse(qs)).toEqual({
      name: 'Fernando',
      abilities: ['JS', 'TDD'],
    });
  });
});
