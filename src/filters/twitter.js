export default {
  hashtags: {
    filter: tag => `<a target="_blank" href="https://twitter.com/hashtag/${tag.replace('#', '')}">${tag}</a>`
  }
};
