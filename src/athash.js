import Parser from './parser';

export default function AtHash(text = null) {
  return new Parser(text);
}
