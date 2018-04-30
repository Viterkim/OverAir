const request = require('request');
const fs = require('fs');
const path = require('path');
const downloadUtils = require('./utils/DownloadUtils');
const shellUtils = require('./utils/ShellUtils');

// Get version numbers from local files
let JSONRequest = {
  "localVersion": 3
};

let downloadLocation = '/Users/viter/Documents/OverAir/OverAirClient/DownloadedFiles';

downloadUtils.downloadFile('boot', JSONRequest, downloadLocation);
// shellUtils.runCommand('touch ./DownloadedFiles/bbbb');
// shellUtils.runFile('testfile.sh');