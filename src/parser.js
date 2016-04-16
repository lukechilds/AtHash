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

  // Parse text
  parse() {
    return this._text;
  }
}
