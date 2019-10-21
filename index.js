#!/usr/bin/env node

const fs = require('fs');

const type = process.argv[2];
const componentName = process.argv[3];

let baseDir;

switch (type) {
  case 'screen':
    baseDir = 'screens';
    break;
  case 'component':
    baseDir = 'components';
    break;
  default:
    console.error('You have to select either "screen" or "component"');
    process.exit(1);
}

if (componentName == null) {
  console.error('You have to provide a name for the new component');
  process.exit(1);
}

const indexTemplate =
`export { ${componentName} } from './${componentName}';
`;

const componentTemplate =
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

const destDir = `${baseDir}/${componentName}`;

if (fs.existsSync(destDir)) {
  console.error(`The "${componentName}" ${type} already exists`);
  process.exit(1);
}

fs.mkdirSync(destDir);
fs.writeFileSync(`${destDir}/index.js`, indexTemplate);
fs.writeFileSync(`${destDir}/${componentName}.js`, componentTemplate);

console.log(`The "${componentName}" ${type} was created successfully`);