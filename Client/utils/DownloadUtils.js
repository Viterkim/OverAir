const request = require('request');
const fs = require('fs');
const path = require('path');

//Request type: application, boot, rootfs, kernel
function downloadFile(requestURI, localVersion, requestedVersion, saveFileLocation, downloadURL) {
  return new Promise(resolve => {
    let fileName;
    let r = request({
      url: downloadURL + requestURI,
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

async function updateKernel(localVersions, updateVersions, saveLocation) {
  if (localVersions.kernel < updateVersions.kernel) {
    console.log('Updating Kernel from ' + localVersions.kernel + ' to ' + updateVersions.kernel);

    let fileName = await downloadFile('kernel', localVersions.kernel, updateVersions.kernel ,saveLocation, updateVersions.updatePath);

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

async function updateApplication(localVersions, updateVersions, saveLocation) {
  if (localVersions.mainApp < updateVersions.mainApp) {
    console.log('Updating Application from ' + localVersions.mainApp + ' to ' + updateVersions.mainApp);


    let fileName = await downloadFile('application', localVersions.mainApp, updateVersions.mainApp, saveLocation, updateVersions.updatePath);

  }
}


module.exports = {
  updateKernel,
  updateApplication
}