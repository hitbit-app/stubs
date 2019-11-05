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

  // Note that 'index' is excluded too
  if (name[0].toLowerCase() === name[0]) {
    const capitalized = name[0].toUpperCase() + name.slice(1);
    return console.error(`Invalid component name, use ${capitalized} instead`);
  }

  if (existsSync(destDir)) {
    return console.error(`"${name}" ${type} already exists`);
  }

  mkdirp(destDir);

  writeFileSync(path.join(destDir, 'index.js'), indexTemplate(name));
  writeFileSync(path.join(destDir, `${name}.js`), componentTemplate(name));

  console.log(`"${name}" ${type} was created successfully`);
};
