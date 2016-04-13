export default class Parser {

  constructor(text = null) {
    this.setText(text);
  }

  // Set text to parse
  setText(text) {
    this.text = text;

    // Chainable
    return this;
  }

  // Parse text
  parse() {
    return this.text;
  }
}
