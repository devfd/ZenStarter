// @flow
/* eslint-disable no-console, no-restricted-syntax */

const fs = require('fs');
const assert = require('assert');
const jimp = require('jimp');

const [appIcon] = process.argv.slice(2);

if (!appIcon) {
  console.error('Missing app icon filemane.');
  console.log('Usage: "node scripts/update-appicon <BASE_IMAGE>"');
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

async function generateIosAppIcon(baseImage) {
  const projectDir = findIosProjectDirPath();

  if (!projectDir) {
    console.error('Cannot find your ios project dir');
    return;
  }

  const fullPath = `${projectDir}/Images.xcassets/Appicon.appiconset`;
  const { images } = JSON.parse(fs.readFileSync(`${fullPath}/Contents.json`));

  for (const image of images) {
    const dim = Number(image.size.split('x')[0].trim());
    const scale = Number(image.scale.split('x')[0].trim());
    const [w, h] = [dim * scale, dim * scale];
    baseImage.clone().resize(w, h).write(`${fullPath}/${image.filename}`);
  }
}

async function processBaseImage(name) {
  const baseImage = await jimp.read(name);
  if (baseImage.bitmap.width < 1024 || baseImage.bitmap.height < 1024) {
    console.error('You need a base image with at least a size of 1024x1024 pixels');
    process.exit(-1);
  }

  if (baseImage.bitmap.width !== baseImage.bitmap.height) {
    console.error('You need a square base image');
    process.exit(-1);
  }

  try {
    assert(fs.statSync('ios').isDirectory());
    assert(fs.statSync('android').isDirectory());
  } catch (err) {
    console.error('should be run from projet root');
    process.exit(-1);
  }

  await Promise.all([
    generateIosAppIcon(baseImage),
  ]);
}

processBaseImage(appIcon);
