const request = require('request');
const fs = require('fs');
const path = require('path');
const downloadUtils = require('./utils/DownloadUtils');
const shellUtils = require('./utils/ShellUtils');
const versionGrabber = require('./utils/VersionGrabber');

//Get local and remote versions
let updateVersions = require('./update.json');
let localVersions = versionGrabber.getJSONVersions();
// console.log(localVersions);

//Update loop

//Kernel
//downloadUtils.updateKernel(localVersions, updateVersions);

//Main app
//downloadUtils.updateApplication(localVersions, updateVersions);

//Rootfs