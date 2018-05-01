const fs = require('fs');
const path = require('path');

let rootfsPath = '/Users/viter/Documents/OverAir/OverAirClient/tmp/tmpRootfs/';
// let rootfsPath = '/';
let bootPath = '/Users/viter/Documents/OverAir/OverAirClient/tmp/tmpBoot/';
// let bootPath = '/mnt/boot/';
let appPath = '/Users/viter/Documents/OverAir/OverAirClient/tmp/tmpApp/';
// let bootPath = '/mnt/application/';

//Returns the highest version number for the application
function getNewestKernelVersion(filePath) {
  let versionsArr = fs.readdirSync(filePath).filter(function (e) {
    return (e.substr(0, 5) === 'Image');
  }).map(function (file) {
    let result = Number(file.split('.')[1]);
    //Checks if the kernel has a number
    if (isNaN(result)) {
      return 1;
    }
    return Number(file.split('.')[1]);
  });
  let highestVersion = Math.max(...versionsArr);
  return highestVersion;
}

function getJSONVersions() {
  let versions = {};
  versions.rootfs = require(rootfsPath + 'version.json').version;
  versions.kernel = getNewestKernelVersion(bootPath);
  versions.mainApp = require(appPath + 'version.json').version;
  return versions;
}

module.exports = {
  getJSONVersions
}