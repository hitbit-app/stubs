const { existsSync, writeFileSync } = require('fs');
const path = require('path');
const mkdirp = require('./mkdirp');

const indexTemplate = componentName =>
`export { ${componentName} } from './${componentName}';
`;

const componentTemplate = componentName =>
`import React from 'react';
import { View, Text } from 'react-native';

export function ${componentName}(props) {
  return (
    <View>
      <Text>hello, world</Text>
    </View>
  );
}
`;

module.exports = function mkcomponent({ baseDir, name, type }) {
  const destDir = path.join(baseDir, name);

  if (existsSync(destDir)) {
    return console.error(`The "${name}" ${type} already exists`);
  }

  mkdirp(destDir);

  writeFileSync(path.join(destDir, 'index.js'), indexTemplate(name));
  writeFileSync(path.join(destDir, `${name}.js`), componentTemplate(name));

  console.log(`The "${name}" ${type} was created successfully`);
};
