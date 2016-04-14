var expect = require('chai').expect;

var AtHash = require('../dist/athash');
var Parser = require('../dist/parser');

describe('AtHash', function() {
  it('should return instance of parser', function () {
    expect(AtHash()).to.be.an.instanceof(Parser);
  });
});
