const request = require('supertest');

const db = require('../data/dbConfig.js');
const dbModel = require('./testModel.js');

describe('hobbits model', () => {
    describe('insert()', () => {
        afterEach(async () => {
            await db('test').truncate()
        })
        it('should insert the provided hobbit into the db', async () => {
            const hobbit = await dbModel.insert({name: 'sam'})
            expect(hobbit.name).toBe('sam')
        })
        it('should insert the provided hobbit into the db', async () => {
            await dbModel.insert({name: 'test1'})
            await dbModel.insert({name: 'test2'})
            
            const hobbits = await db('test')
            expect(hobbits).toHaveLength(2) 
        })  
          
    })
    describe('remove()', () => {
        // afterEach(async () => {
        //   await db('test').truncate();
        // });
        it('should fail to remove if there is nothing to remove', async () => {
          await dbModel.insert({ name: 'test2'});
          const result = await dbModel.remove(2);
          expect(result).toBe(0);
        })
        it('should return id if successfully removed', async () => {
          await dbModel.insert({ name: 'test2' });
          const result = await dbModel.remove(2);
          expect(result).toBe(2);
        })
      })  
})  