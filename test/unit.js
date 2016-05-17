import test from 'ava';

import AtHash from '../dist/athash';
import Parser from '../dist/parser';
import twitterFilter from '../dist/filters/twitter';

const text = "#test #text with #hashtags, @multiple @mentions and a http://url.com";

test('AtHash() should return instance of parser', t => {
  t.true(AtHash() instanceof Parser);
});

test('AtHash() can be instantiated by new or factory function', t => {
  t.true(AtHash() instanceof Parser);
  t.true(new AtHash instanceof Parser);
});

test('.text() should set text property', t => {
  const atHash = AtHash();
  t.is(atHash._text, null);
  atHash.text('foo');
  t.is(atHash._text, 'foo');
});

test('.text() should be chainable', t => {
  t.true(AtHash().text() instanceof Parser);
});

test('.get() should return empty array on no matches', t => {
  t.deepEqual(AtHash().get('hashtags'), []);
  t.deepEqual(AtHash().get('mentions'), []);
  t.deepEqual(AtHash().get('urls'), []);
});

test('.get() should get array from matches', t => {
  t.deepEqual(AtHash(text).get('hashtags'), ['#test', '#text', '#hashtags']);
  t.deepEqual(AtHash(text).get('mentions'), ['@multiple', '@mentions']);
  t.deepEqual(AtHash(text).get('urls'), ['http://url.com']);
});

test('.get() should throw error if trying to use nonexistent filter', t => {
  t.throws(() => AtHash().get('nonexistentfilter'));
});

test('.addFilter() should add default filters', t => {
  const atHash = AtHash();
  t.is(atHash.filters.hashtags.filter, undefined);
  atHash.addFilter('twitter');
  t.is(atHash.filters.hashtags.filter, twitterFilter.hashtags.filter);
});

test('.addFilter() should add custom filters', t => {
  const atHash = AtHash();
  const customFilter = { hashtags: { filter: tag => tag } };
  t.is(atHash.filters.hashtags.filter, undefined);
  atHash.addFilter(customFilter);
  t.is(atHash.filters.hashtags.filter, customFilter.hashtags.filter);
});

test('.addFilter() throw error if filter is invalid', t => {
  t.throws(() => AtHash().addFilter('nonexistentfilter'));
});

test('.addFilter() should be chainable', t => {
  t.true(AtHash().addFilter({}) instanceof Parser);
});

test('.parse() should return empty string on instance with no text', t => {
  t.is(AtHash().parse(), '');
});

test('.parse() should return text on instance with text', t => {
  t.is(AtHash('foo').parse(), 'foo');
});

test('.parse() should run url filter on url', t => {
  t.is(AtHash('http://url.com').parse(), '<a target="_blank" href="http://url.com">http://url.com</a>');
});
