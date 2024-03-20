global.fetch = require('node-fetch');


const mockQnaModel = jest.fn().mockImplementation(() => {
  return {
    initialize: jest.fn(),
    askQuestion: jest.fn(),
  };
});

export default mockQnaModel;
