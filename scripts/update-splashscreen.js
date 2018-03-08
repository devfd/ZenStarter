// @flow
/* eslint-disable no-console, no-restricted-syntax */

const fs = require('fs');
const assert = require('assert');
const path = require('path');

const [splash] = process.argv.slice(2);

if (!splash) {
  console.error('Missing app icon filemane.');
  console.log('Usage: "node scripts/update-splashscreen <SPLASH_IMAGE>"');
  process.exit(-1);
}

function findIosProjectDirPath() {
  const iosFiles = fs.readdirSync('ios');

  for (const file of iosFiles) {
    const dirPath = `ios/${file}`;

    if (fs.statSync(dirPath).isDirectory() &&
      fs.readdirSync(dirPath).indexOf('Images.xcassets') !== -1) {
      return dirPath;
    }
  }
  return null;
}

async function copySplash(name) {
  const projectDir = findIosProjectDirPath();

  if (!projectDir) {
    console.error('Cannot find your ios project dir');
    return;
  }

  console.log('copy ', name, projectDir);
  fs.createReadStream(name).pipe(fs.createWriteStream(`${projectDir}/${path.basename(name)}`));
}

async function processBaseImage(name) {
  try {
    assert(fs.statSync('ios').isDirectory());
    assert(fs.statSync('android').isDirectory());
  } catch (err) {
    console.error('should be run from projet root');
    process.exit(-1);
  }

  await Promise.all([
    copySplash(name),
  ]);
}

processBaseImage(splash);
