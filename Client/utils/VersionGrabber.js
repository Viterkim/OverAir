const fs = require('fs');
const path = require('path');

let rootfsPath = '/Users/viter/Documents/OverAir/Client/tmp/tmpRootfs/';
let bootPath = '/Users/viter/Documents/OverAir/Client/tmp/tmpBoot/';
let appPath = '/Users/viter/Documents/OverAir/Client/tmp/tmpApp1/Firmware/';
// let rootfsPath = '/';
// let bootPath = '/mnt/boot/';
// let appPath = '/mnt/application/Firmware';

//Returns the highest version number for the kernel
function getNewestKernelVersion(filePath) {
  let versionsArr = fs.readdirSync(filePath).filter(function (e) {
    return (e.substr(0, 5) === 'Image');
  }).map(function (file) {
    let result = Number(file.split('.')[1]);
    //Checks if the kernel has a number, if it doesn't assume it's 1
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
  versions.mainApp = require(appPath + 'version.json').version;
  versions.kernel = getNewestKernelVersion(bootPath);
  return versions;
}

module.exports = {
  getJSONVersions
}