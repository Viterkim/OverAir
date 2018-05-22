const fs = require('fs');
const updateUtils = require('./utils/updateUtils');
const versionGrabber = require('./utils/VersionGrabber');
const folderLoc = require('./folderLocations');

//Get local and remote versions
let updateVersions = require(folderLoc.boot + 'update.json');
let localVersions = versionGrabber.getJSONVersions();

// updateUtils.updateKernel(localVersions, updateVersions);
//updateUtils.updateApplication(localVersions, updateVersions);
updateUtils.updateRootfs(localVersions, updateVersions);