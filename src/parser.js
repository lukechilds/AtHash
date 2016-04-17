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

  // Add filter
  addFilter(filter) {

    // Check if it's a default filter key
    const newFilters = defaultFilters[filter] || filter;

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
  parse(filter = null) {

    // If filter is passed add it
    if(filter) {
      this.addFilter(filter);
    }

    return this._text;
  }
}
