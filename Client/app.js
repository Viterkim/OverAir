const request = require('request');
const fs = require('fs');
const path = require('path');
const downloadUtils = require('./utils/DownloadUtils');
const shellUtils = require('./utils/ShellUtils');
const versionGrabber = require('./utils/VersionGrabber');

//Get local and remote versions
let updateVersions = require('./update.json');
let localVersions = versionGrabber.getJSONVersions();

//Update loop

//Kernel
// let kernelDownloadLocation = '/mnt/boot/';
let kernelDownloadLocation = '/Users/viter/Documents/OverAir/Client/tmp/tmpBoot';
// downloadUtils.updateKernel(localVersions, updateVersions, kernelDownloadLocation);

//Main app
// let appDownloadLocation = '/mnt/temp/';
let appDownloadLocation = '/Users/viter/Documents/OverAir/Client/tmp/tmpTemp';
downloadUtils.updateApplication(localVersions, updateVersions, appDownloadLocation);

//Get diff
//Apply on tar
//Unpack and switch to new software on reboot (change init?)


// shellUtils.runCommand('touch ./DownloadedFiles/bbbb');
// shellUtils.runFile('testfile.sh');