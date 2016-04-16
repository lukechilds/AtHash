import defaultFilters from './filters';

export default class Parser {

  constructor(text = null) {
    this.text(text);
    this.filters = {
      hashtags: {
        regex: /\B#\w*[a-zA-Z]+\w*/g
      }
    };
  }

  // Set text to parse
  text(text) {
    this._text = text;

    // Chainable
    return this;
  }

  // Get items from text
  get(filterKey) {

    // Make sure we have a string
    const text = typeof this._text === 'string' ? this._text : '';

    // Make sure filter exists
    if(!this.filters[filterKey]) {
      throw new Error(`Filter "${filterKey}" doesn't exist`);
    }

    // Return matches or empty array
    return text.match(this.filters[filterKey].regex) || [];
  }

  // Parse text
  parse() {
    return this._text;
  }
}
