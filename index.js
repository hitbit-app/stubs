#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const mkcomponent = require('./mkcomponent');

const type = process.argv[2];
const componentNames = process.argv.slice(3);

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
  case 'screens':
    baseDir = path.join(appDir, 'screens');
    break;
  case 'component':
  case 'components':
    baseDir = path.join(appDir, 'components');
    break;
  default:
    console.error('You have to select either "screen" or "component"');
    process.exit(1);
}

if (componentNames.length === 0) {
  console.error('You have to provide a name for at least one component');
  process.exit(1);
}

componentNames.forEach(name => mkcomponent({ baseDir, name, type }));
