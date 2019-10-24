const { existsSync, statSync, mkdirSync } = require('fs');
const { dirname } = require('path');

module.exports = function mkdirp(path, ...args) {
  const parent = dirname(path);

  if (!existsSync(parent)) {
    mkdirp(parent);
  } else if (!statSync(parent).isDirectory()) {
    throw new Error(`Cannot create "${path}", "${parent}" is not a directory`);
  }

  return mkdirSync(path, ...args);
}
