const request = require('request');
const fs = require('fs');
const path = require('path');
const shell = require('./ShellUtils');
const folderLoc = require('../folderLocations');

//Request type: application, boot, rootfs, kernel
function downloadFile(downloadURL, saveFileLocation, localVersion, requestedVersion) {
  return new Promise(resolve => {
    let fileName;
    let r = request({
      url: downloadURL,
      method: 'POST',
      json: true,
      body: {
        'localVersion': localVersion,
        'requestedVersion': requestedVersion
      }
    }).on('response', function (response) {
      if (response.statusCode == 200) {
        //Get the filename from headers
        fileName = response.headers["content-disposition"].replace(/.*filename="(.+)".*/, '$1');
        //Save file
        r.pipe(fs.createWriteStream(path.join(saveFileLocation, fileName)));
        resolve(fileName);
      }
      else {
        console.log('Status code ' + response.statusCode);
      }
    });
  })
}

async function updateKernel(localVersions, updateVersions) {
  if (localVersions.kernel < updateVersions.kernel) {
    console.log('Updating Kernel from ' + localVersions.kernel + ' to ' + updateVersions.kernel);

    let saveLocation = folderLoc.kernelDownloadLocation;
    let downloadURL = updateVersions.updatePath + 'kernel';
    let fileName = await downloadFile(downloadURL, saveLocation, localVersions.kernel, updateVersions.kernel);

    //Checks of the partition is mounted
    if (fs.existsSync(saveLocation)) {
      let configFile = saveLocation + '/config.txt';

      //Read uboot config file to set new kernel
      fs.readFile(configFile, 'utf8', function (err, data) {
        if (err) {
          return console.log(err);
        }

        let result = data.replace(/(Image[^]+?).*/g, fileName + '\n');
        fs.writeFile(configFile, result, 'utf8', function (err) {
          if (err) return console.log(err);
          console.log('Done! Updated kernel to version ' + updateVersions.kernel);
        });
      });
    }
    else {
      console.log('Boot partition not mounted')
    }
  }
  else {
    console.log('Kernel already up to date with version ' + localVersions.kernel);
  }
}


async function updateApplication(localVersions, updateVersions) {
  if (localVersions.mainApp < updateVersions.mainApp) {
    console.log('Updating Application from ' + localVersions.mainApp + ' to ' + updateVersions.mainApp);

    //Find inactive partition
    let isApp1Active = require(folderLoc.app1 + 'Firmware/version.json').isActive;
    let baseFolder = (isApp1Active ? folderLoc.app2 : folderLoc.app1);

    //We checked to see if we should update earlier... However the partition/software we are applying the diff on
    //is a different version, so we need to update that instead.
    let currentLocalVersion = require(baseFolder + 'Firmware/version.json').version;
    let downloadURL = updateVersions.updatePath + 'application';
    let patchName = await downloadFile(downloadURL, baseFolder, currentLocalVersion, updateVersions.mainApp);
    let firmwareFile = 'Firmware.tar';

    //Apply diff on the same file, remove old folder and patch, extract new file
    await shell.runCommand(`cd ${baseFolder} && xdelta3 -f -d -s ${firmwareFile} ${patchName} ${firmwareFile}`);
    await shell.runCommand(`cd ${baseFolder} && rm -rf Firmware ${patchName}`);
    await shell.runCommand(`cd ${baseFolder} && tar -xf ${firmwareFile}`);

    //Set new partition as active etc
    
  }
}


module.exports = {
  updateKernel,
  updateApplication
}