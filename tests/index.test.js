

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const app = require('../src/app.js')

const dom = new JSDOM(``, {
    url: "http:sgc.40040160.qpc.hal.davecutting.uk",
    includeNodeLocations: true,
    storageQuota: 10000000
  });
  
/**
 * @jest-environment jsdom
 */
test('Test displayTotal function', () => {


})