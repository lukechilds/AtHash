var expect = require('chai').expect;

var AtHash = require('../dist/athash');
var Parser = require('../dist/parser');

describe('AtHash', function() {

  it('Should return instance of parser', function () {
    expect(AtHash()).to.be.an.instanceof(Parser);
  });

  describe('.text()', function() {

    it('Should set text property', function () {
      var atHash = AtHash();
      expect(atHash._text).to.equal(null);
      atHash.text('foo');
      expect(atHash._text).to.equal('foo');
    });

    it('Should be chainable', function () {
      expect(AtHash().text()).to.be.an.instanceof(Parser);
    });

  });

  describe('.parse()', function() {

    it('Empty instance should return null', function () {
      expect(AtHash().parse()).to.equal(null);
    });

    it('Instance wirh text should return text', function () {
      expect(AtHash('foo').parse()).to.equal('foo');
    });

  });

});
