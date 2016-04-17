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
  get(filterType) {

    // Make sure we have a string
    const text = typeof this._text === 'string' ? this._text : '';

    // Make sure filter exists
    if(!this.filters[filterType]) {
      throw new Error(`Filter "${filterType}" doesn't exist`);
    }

    // Return matches or empty array
    return text.match(this.filters[filterType].regex) || [];
  }

  // Add filter
  addFilter(filters) {

    // Check if it's a default filter key
    const newFilters = defaultFilters[filters] || filters;

    // Check we have a valid object
    if(typeof newFilters !== 'object') {
      throw new Error(`Invalid filter`);
    }

    // Merge in new filters
    Object.keys(newFilters).forEach(filterType => {
      Object.keys(newFilters[filterType]).forEach(filterTypeKey => {
        const newVal = newFilters[filterType][filterTypeKey];
        this.filters[filterType][filterTypeKey] = newVal;
      });
    });

    // Chainable
    return this;
  }

  // Parse text
  parse(filters = null) {

    // If filter is passed add it
    if(filters) {
      this.addFilter(filters);
    }

    return this._text;
  }
}
