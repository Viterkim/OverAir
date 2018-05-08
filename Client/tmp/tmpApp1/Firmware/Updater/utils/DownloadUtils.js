const request = require('request');
const fs = require('fs');
const path = require('path');

//Request type: application, boot, rootfs, kernel
//Localversion setup temporarily...
function downloadFile(requestURI, localVersion, saveFileLocation, downloadURL) {
  return new Promise(resolve => {
    let fileName;
    let r = request({
      url: downloadURL + requestURI,
      method: "POST",
      json: true,
      body: { "localVersion": localVersion }
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

async function updateKernel(localVersions, updateVersions){
  if (localVersions.kernel < updateVersions.kernel){
    console.log('Updating Kernel from ' + localVersions.kernel + ' to ' + updateVersions.kernel);
    // let kernelDownloadLocation = '/mnt/boot/';
    let kernelDownloadLocation = '/Users/viter/Documents/OverAir/OverAirClient/tmp/tmpBoot';
    let fileName = await downloadFile('kernel', 1, kernelDownloadLocation, updateVersions.updatePath);

    //Checks of the partition is mounted
    if(fs.existsSync(kernelDownloadLocation)){
      let configFile = kernelDownloadLocation + '/config.txt';
  
      fs.readFile(configFile, 'utf8', function (err,data) {
        if (err) {
          return console.log(err);
        }

        let result = data.replace(/(Image[^]+?).*/g, fileName + '\n');
        fs.writeFile(configFile, result, 'utf8', function (err) {
           if (err) return console.log(err);
        });
      });
    }
    else{
      console.log('Boot partition not mounted')
    }
  }
}

function updateApplication(){
  
}


module.exports = {
  downloadFile,
  updateKernel,
  updateApplication
}