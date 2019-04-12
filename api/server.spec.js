const request = require('supertest');

const server = require('./server.js');

describe('server.js', () => {
    it('should set testing enviroment', () => {
        expect(process.env.DB_ENV).toBe('testing')

    })
    // describe('GET', () => {
    //     it('should return 200 OK', () => {
    //         return request(server).get('/').then(res => {
    //             expect(res.status).toBe(500)
    //         })
    //     })
    // })
       describe('GET', () => {
        it('should return 200 OK using squad', async () => {
            const res = await request(server).get('/')
            expect(res.status).toBe(200)
        
        })
        it('should return JSON', async () => {
            const res = await request(server).get('/')
            expect(res.type).toBe('application/json')
        })
        it('should return {api: "up"}', async () => {
            const res = await request(server).get('/')
            expect(res.body).toEqual({api: 'up'})
        })
    })
})