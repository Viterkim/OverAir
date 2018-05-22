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

  //Check for which parts are active
  let activeJSON = require(folderLoc.boot + 'active.json');

  //Current rootfs is active
  versions.rootfs = require(folderLoc.rootfs + 'version.json').version;

  //Checks for active app version
  let activeAppFolder = (activeJSON.app == 1 ? folderLoc.app1 : folderLoc.app2);
  versions.app = require(activeAppFolder + 'version.json').version;

  //Searches folder to get highest kernel version from file name
  versions.kernel = getNewestKernelVersion(folderLoc.boot);
  return versions;
}

module.exports = {
  getJSONVersions
}