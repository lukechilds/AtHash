export default {
  mentions: {
    filter: user => `<a target="_blank" href="https://github.com/${user.replace('@', '')}">${user}</a>`
  }
};
