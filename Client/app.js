const fs = require('fs');
const downloadUtils = require('./utils/DownloadUtils');
const versionGrabber = require('./utils/VersionGrabber');
const folderLoc = require('./folderLocations');

//Get local and remote versions
let updateVersions = require(folderLoc.boot + 'update.json');
let localVersions = versionGrabber.getJSONVersions();

downloadUtils.updateKernel(localVersions, updateVersions);
//downloadUtils.updateApplication(localVersions, updateVersions);
//downloadUtils.updateRootfs(localVersions, updateVersions);