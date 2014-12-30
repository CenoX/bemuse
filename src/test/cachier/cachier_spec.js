
import { Cachier } from '../../cachier'

describe('Cachier', function() {

  let cachier
  let databaseNumber = 0

  beforeEach(() =>
    cachier = new Cachier(`test.${new Date().getTime()}.${++databaseNumber}`))
  afterEach(() =>
    cachier.destroyDatabase())

  describe('#save', () => {
    it('stores a blob', () => {
      let blob = new Blob(['hello'])
      return cachier.save('wow', blob)
        .then(result => expect(result).toBeTruthy())
    })
  })

  describe('with a blob saved', () => {

    beforeEach(() => {
      let blob = new Blob(['hello'])
      return cachier.save('wow2', blob, { name: 'example1' })
    })

    describe('#load', function() {
      it('should return the blob value', () => {
        return cachier.load('wow2').then(function({ blob, metadata }) {
          expect(blob.size).toBe(5)
          expect(metadata).toEqual({ name: 'example1' })
        })
      })
    })

    describe('#save', function() {
      it('should replace content with a new blob', () => {
        let blob2 = new Blob(['world!'])
        return cachier.save('wow2', blob2)
          .delay(10) // chrome needs this delay
          .then(() => cachier.load('wow2'))
          .then(function({ blob, metadata }) {
            expect(blob.size).toBe(6)
            expect(metadata).toBe(undefined)
          })
      })
    })

    describe('#delete', function() {
      it('should remove the blob', () => {
        return cachier.delete('wow3')
          .then(() => cachier.load('wow3')
            .then(
              () => { throw new Error('should not be success') },
              () => 'ok, error is thrown'
            )
          )
      })
    })

  })

})
