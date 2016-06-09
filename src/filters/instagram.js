export default {
  hashtags: {
    filter: tag => `<a target="_blank" href="https://www.instagram.com/explore/tags/${tag.replace('#', '')}/">${tag}</a>`
  },
  mentions: {
    filter: user => `<a target="_blank" href="https://www.instagram.com/${user.replace('@', '')}/">${user}</a>`
  }
};
