const fs = require('fs');
const downloadUtils = require('./utils/DownloadUtils');
const versionGrabber = require('./utils/VersionGrabber');
const folderLoc = require('./folderLocations');

//Get local and remote versions
let updateVersions = require('./update.json');
let localVersions = versionGrabber.getJSONVersions();
localVersions.kernel = 1;

downloadUtils.updateKernel(localVersions, updateVersions);
//downloadUtils.updateApplication(localVersions, updateVersions);