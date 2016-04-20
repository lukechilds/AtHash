import Parser from './parser';

// Factory function to return parser instance
export default function AtHash(text = null) {
  return new Parser(text);
}
