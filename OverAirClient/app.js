const request = require('request');
const fs = require('fs');
const path = require('path');
const downloadUtils = require('./utils/DownloadUtils');
const shellUtils = require('./utils/ShellUtils');

let updateVersions = require('./update.json');
//Generate from different json files on system
let localVersions = require('./local.json');



downloadUtils.updateKernel(localVersions, updateVersions);

// downloadUtils.downloadFile('boot', JSONRequest, downloadLocation);
// shellUtils.runCommand('touch ./DownloadedFiles/bbbb');
// shellUtils.runFile('testfile.sh');