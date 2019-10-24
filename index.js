#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const mkdirp = require('./mkdirp');

const type = process.argv[2];
const componentName = process.argv[3];

const appDir = process.env.PWD;
const appPackage = path.join(appDir, 'package.json');

if (!fs.existsSync(appPackage)) {
  const { name } = require('./package.json');
  console.error(`Please run ${name} from your app root`);
  process.exit(1);
}

let baseDir;

switch (type) {
  case 'screen':
    baseDir = path.join(appDir, 'screens');
    break;
  case 'component':
    baseDir = path.join(appDir, 'components');
    break;
  default:
    console.error('You have to select either "screen" or "component"');
    process.exit(1);
}

if (componentName == null) {
  console.error('You have to provide a name for the new component');
  process.exit(1);
}

const destDir = path.join(baseDir, componentName);

if (fs.existsSync(destDir)) {
  console.error(`The "${componentName}" ${type} already exists`);
  process.exit(1);
}

mkdirp(destDir);

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

fs.writeFileSync(path.join(destDir, 'index.js'), indexTemplate);
fs.writeFileSync(path.join(destDir, `${componentName}.js`), componentTemplate);

console.log(`The "${componentName}" ${type} was created successfully`);
