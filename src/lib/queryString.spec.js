const { queryString, parse } = require('./queryString')

describe('Object to query string', () => {
  it('should create a valid query string when an object is provided', () => {
    const obj = {
      name: 'Fabio',
      profession: 'developer'
    }

    expect(queryString(obj)).toBe('name=Fabio&profession=developer')
  })

  it('should create a valid query string even when an array is passed as value', () => {
    const obj = {
      name: 'Fabio',
      abilities: ['JS', 'TDD']
    }

    expect(queryString(obj)).toBe('name=Fabio&abilities=JS,TDD')
  })

  it('should throw an error when an objetc is passed as value', () => {
    const obj = {
      name: 'Fabio',
      abilities: { first: 'JS', second: 'TDD' }
    }

    expect(() => queryString(obj)).toThrowError()
  })
})

describe('Query string to object', () => {
  it('should  convert a query string to object', () => {
    const queryString = 'name=Fabio&profession=developer'
    expect(parse(queryString)).toEqual({
      name: 'Fabio',
      profession: 'developer'
    })
  })

  it('should  convert a query string  of a single key-value pair to object', () => {
    const queryString = 'name=Fabio'
    expect(parse(queryString)).toEqual({
      name: 'Fabio'
    })
  })

  it('should convert a query string to an object taking of comma separated values', () => {
    const queryString = 'name=Fabio&abilities=JS,TDD'
    expect(parse(queryString)).toEqual({
      name: 'Fabio',
      abilities: ['JS', 'TDD']
    })
  })
})
