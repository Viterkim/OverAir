const request = require('request');
const fs = require('fs');
const path = require('path');
const downloadUtils = require('./utils/DownloadUtils');
const shellUtils = require('./utils/ShellUtils');
const versionGrabber = require('./utils/VersionGrabber');

let updateVersions = require('./update.json');
let localVersions = versionGrabber.getJSONVersions();
console.log(localVersions);

// downloadUtils.updateKernel(localVersions, updateVersions);
// downloadUtils.downloadFile('boot', JSONRequest, downloadLocation);
// shellUtils.runCommand('touch ./DownloadedFiles/bbbb');
// shellUtils.runFile('testfile.sh');