const hooks = require('./hooks1');
const config = require('../config').get(process.env.NODE_ENV);
const SearchPage = require('./page-objects/search.page');

//Test Suite
describe('Sample Test', () => {
  let app;

  //is executed before each Test Case
  beforeEach(async () => {
    app = await hooks.startApp();
  });

  //is executed after each Test Case
  afterEach(async() => {
    await hooks.stopApp(app);
  });

  //Test Case
  it('opens a window', async() => {
    await app.client.waitUntilWindowLoaded()
      .getWindowCount()
      .should.eventually.equal(1);
  });

  //Test Case
  it('should get a url', async() => {
    await app.client//.url(config.url)
      .getTitle()
      .should.eventually.include('ABCD EFGH');
  });

  //Test Case
  it('should search', async() => {
    const input = 'this is a test';
    await app.client//.url(config.url)
      .setValue(SearchPage.searchField, input)
      .getValue(SearchPage.searchField)
      .should.eventually.equal(input)
      .click(SearchPage.searchButton)
      .element(SearchPage.searchResult)
      .should.eventually.exist;
  });
  
    //Test Case
    it('Heading Text', async() => {
      const input = 'Hello World!';
      await app.client//.element('#ihd')//.url(config.url)
        .getText('#ihd')
        .should.eventually.equal(input);
    });

  it('should set value for a certain element', async() => {
    var input = 'some test vall';
	await app.client//.url(config.url)
      .setValue('#iabc', input)
      .getValue('#iabc')
      .should.eventually.equal(input);
      //.click(SearchPage.searchButton)
      //.element(SearchPage.searchResult)
      //.should.eventually.exist;
	});

});
