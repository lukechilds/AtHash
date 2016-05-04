import defaultFilters from './filters';
import { regex as urlRegex } from 'my-name-is-url';

export default class Parser {

  constructor(text = null) {
    this.text(text);
    this.filters = {
      hashtags: {
        regex: /\B#\w*[a-zA-Z]+\w*/g
      },
      mentions: {
        regex: /\B@\w*[a-zA-Z]+\w*/g
      },
      urls: {
        regex: urlRegex,
        filter: url => `<a target="_blank" href="${url}">${url}</a>`
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

    // Check we've got something we can parse
    if(typeof this._text !== 'string') {
      return '';
    }

    // If filter is passed add it
    if(filters) {
      this.addFilter(filters);
    }

    // Run filters on text
    return Object.keys(this.filters)
      .reduce((text, filterType) => {

        // Check we've got valid regex and filter
        const regex = this.filters[filterType].regex;
        const filter = this.filters[filterType].filter;
        if(regex instanceof RegExp && typeof filter === 'function') {

          // Run filter
          text = text.replace(regex, filter);
        }

        // Return text for next iteration
        return text;
      }, this._text);
  }
}
