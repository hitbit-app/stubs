const { existsSync, mkdirSync } = require('fs');
const { dirname } = require('path');

module.exports = function mkdirp(path, ...args) {
  const parent = dirname(path);

  if (!existsSync(parent)) {
    mkdirp(parent);
  }

  return mkdirSync(path, ...args);
};
