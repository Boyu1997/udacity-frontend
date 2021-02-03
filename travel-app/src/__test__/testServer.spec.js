import 'regenerator-runtime/runtime';

const app = require('../server/index');
const supertest = require('supertest');
const request = supertest(app);

describe("Testing server", () => {
    test("Testing ''/'' endpint", async (done) => {
        const response = await request.get('/');
        expect(response.status).toBe(200);
        done();
    });
})