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
  get(filter) {

    // Make sure we have a string
    const text = typeof this._text === 'string' ? this._text : '';

    // Return matches or empty array
    return text.match(this.filters[filter].regex) || [];
  }

  // Parse text
  parse() {
    return this._text;
  }
}
