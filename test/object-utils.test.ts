import { ObjectUtils } from '../src/object-utils'

describe('ObjectUtils tests', () => {

  describe('get()', () => {

    it('should get any fragment by path', () => {
      const source = {
        property1: {
          property11: {
            property111: 'property111 value',
            property112: 1234,
            property113: {
              terminalProperty: true
            }
          },
          property12: {
            terminalProperty: true
          }
        },
        property2: ['aaa', 'bbb', 777]
      }

      const paths = [
        ['property1', 'property11', 'property111'],
        ['property1', 'property11', 'property112'],
        ['property1', 'property11', 'property113'],
        ['property1', 'property11', 'property113', 'terminalProperty'],
        ['property1', 'property12'],
        ['property1', 'property12', 'terminalProperty'],
        ['property2'],
        ['property2', 0],
        ['property2', 1],
        ['property2', 2],
      ]

      const values = [
        'property111 value',
        1234,
        {
          terminalProperty: true
        },
        true,
        {
          terminalProperty: true
        },
        true,
        ['aaa', 'bbb', 777],
        'aaa',
        'bbb',
        777
      ]

      for (let i = 0; i < paths.length; i++) {
        const path = paths[i]
        const expectedValue = values[i]
        const actualValue = ObjectUtils.get(source, path)
        if (typeof expectedValue === 'object') {
          expect(actualValue).toMatchObject(expectedValue)
        } else {
          expect(actualValue).toBe(expectedValue)
        }
      }
    })

  })

  describe('set()', () => {

    it('should set any fragment by path', () => {
      const source = {
        property1: {
          property11: {
            property111: 'property111 value',
            property112: 1234,
            property113: {
              terminalProperty: true
            }
          },
          property12: {
            terminalProperty: true
          }
        },
        property2: ['aaa', 'bbb', 777]
      }

      const paths = [
        ['property1', 'property11', 'property111'],
        ['property1', 'property11', 'property112'],
        ['property1', 'property11', 'property113'],
        ['property1', 'property12'],
        ['property1', 'property12', 'terminalProperty'],
        ['property2'],
        ['property2', 0],
        ['property2', 1],
        ['property2', 2],
      ]

      const values = [
        'property222 value',
        4321,
        undefined,
        {
          terminalProperty: true
        },
        undefined,
        ['aaa', 'bbb', 777],
        'aaa',
        'bbb',
        777
      ]

      for (let i = 0; i < paths.length; i++) {
        const path = paths[i]
        const newValue = values[i]
        ObjectUtils.set(source, path, newValue)
      }

      for (let i = 0; i < paths.length; i++) {
        const path = paths[i]
        const expectedValue = values[i]
        const actualValue = ObjectUtils.get(source, path)
        if (typeof expectedValue === 'object') {
          expect(actualValue).toMatchObject(expectedValue)
        } else {
          expect(actualValue).toBe(expectedValue)
        }
      }
    })

  })

})
