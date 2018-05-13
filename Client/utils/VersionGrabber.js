const fs = require('fs');
const path = require('path');
const folderLoc = require('../folderLocations');

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

  //Checks for active app version
  let isApp1Active = require(folderLoc.app1 + 'Firmware/version.json').isActive;
  let app1Folder = (isApp1Active ? folderLoc.app1 : folderLoc.app2);
  versions.mainApp = require(app1Folder + 'Firmware/version.json').version;

  versions.rootfs = require(folderLoc.rootfs + 'version.json').version;
  versions.kernel = getNewestKernelVersion(folderLoc.boot);
  return versions;
}

module.exports = {
  getJSONVersions
}