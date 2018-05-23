const request = require('request');
const fs = require('fs');
const path = require('path');
const xdelta3 = require('./Xdelta3Utils');
const folderLoc = require('../folderLocations');

//Request type: app, rootfs, kernel
function downloadFile(downloadURL, saveFileLocation, localVersion, requestedVersion) {
  return new Promise((resolve, reject) => {
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
        reject('Error status code downloading: '+ response.statusCode);
      }
    });
  })
}

async function updateKernel(localVersions, updateVersions) {
  return new Promise(async(resolve ,reject) => {
    if (localVersions.kernel < updateVersions.kernel) {
      try{
        console.log('Updating Kernel from ' + localVersions.kernel + ' to ' + updateVersions.kernel);
  
        //Make a request to the downloadurl/kernel
        let downloadURL = updateVersions.updatePath + 'kernel';
        let fileName = await downloadFile(downloadURL, folderLoc.tmp, localVersions.kernel, updateVersions.kernel);
    
        //Apply delta on newest kernel
        //If Kernel is version 1, don't add a version number
        let oldVersion = (localVersions.kernel == 1 ? '' : `.${updateVersions.kernel}`);
        let oldKernelName = `Image${oldVersion}`;
        let newKernelName = `Image.${updateVersions.kernel}`;
        
        //Xdelta3: base file, delta, new file
        await xdelta3.applyDelta(`${folderLoc.boot}${oldKernelName}`, `${folderLoc.tmp}${fileName}`, `${folderLoc.boot}${newKernelName}`);
        
        //Set boot active.json (boot) to newer version
        let activeLocation = folderLoc.boot + 'active.json';
        let activeObj = require(activeLocation);
        activeObj.kernel = updateVersions.kernel;
        fs.writeFileSync(activeLocation, JSON.stringify(activeObj, null, 2), 'utf8'); //stringify last argument is spacing
        
        //Make sure there's only the 2 newest kernels
        let kernelsToDelete = fs.readdirSync(folderLoc.boot).filter(function (e) {
          //Files which are called Image but NOT oldKernelName or newKernelName
          return (e.substr(0, 5) === 'Image' && (e !== oldKernelName && e !== newKernelName));
        });
        //Kernelstodelete needs to be entire file path
        kernelsToDelete = kernelsToDelete.map(function(e){
          return folderLoc.boot + e;
        });
        //Cleanup, and delete the files
        kernelsToDelete.forEach(function(e){
          fs.unlink(e, function(err){
            return err;
          });
        });
    
        //Read uboot config file to set new kernel
        let configFile = folderLoc.boot + 'config.txt';
        fs.readFile(configFile, 'utf8', function (err, data) {
          if (err) {
            return err;
          }
    
          let result = data.replace(/(kernel=)(.+)/, `$1${newKernelName}`);
          fs.writeFile(configFile, result, 'utf8', function (err) {
            if (err) return err;
            console.log('Done! Updated kernel to version ' + updateVersions.kernel);
            resolve(updateVersions.kernel);
          });
        });
      }
      catch(err){
        console.log(err);
        reject(err);
      }
    }
    else {
      console.log('Kernel already up to date with version ' + localVersions.kernel);
      resolve(localVersions.kernel);
    }
  });
}

async function updateApplication(localVersions, updateVersions) {
  return new Promise(async(resolve ,reject) => {
    if(localVersions.app < updateVersions.app){
      console.log('Updating App from ' + localVersions.app + ' to ' + updateVersions.app);
      try{
        let downloadURL = updateVersions.updatePath + 'app';
        let fileName = await downloadFile(downloadURL, folderLoc.tmp, localVersions.app, updateVersions.app);
  
        // Get the active JSON object
        let activeLocation = folderLoc.boot + 'active.json';
        let activeObj = require(activeLocation);
        let activeApp = activeObj.app;
        
        // App partitions are 5 and 6
        let activeAppDev, inactiveApp, inactiveAppDev;
        if(activeApp === 5){
          inactiveApp = 6;
          inactiveAppDev = folderLoc.device + inactiveApp;
          activeAppDev = folderLoc.device + activeApp;
        }
        else{
          inactiveApp = 5;
          inactiveAppDev = folderLoc.device + inactiveApp;
          activeAppDev = folderLoc.device + activeApp;
        }
  
        //Xdelta3: base file(current rootfs), delta, new file(inactive)
        await xdelta3.applyDelta(`${activeAppDev}`, `${folderLoc.tmp}${fileName}`, `${inactiveAppDev}`);
  
        activeObj.app = inactiveApp;
        fs.writeFileSync(activeLocation, JSON.stringify(activeObj, null, 2), 'utf8'); //stringify last argument is spacing
  
        console.log('Done! Updated app to version ' + updateVersions.app);
        resolve(updateVersions.app);
      }
      catch(err){
        console.log(err);
        reject(err);
      }
    }
    else{
      console.log('App already up to date with version ' + localVersions.app);
      resolve(localVersions.app);
    }
  });
}

async function updateRootfs(localVersions, updateVersions) {
  return new Promise(async(resolve ,reject) => {
    if(localVersions.rootfs < updateVersions.rootfs){
      console.log('Updating Rootfs from ' + localVersions.rootfs + ' to ' + updateVersions.rootfs);
      try{
        let downloadURL = updateVersions.updatePath + 'rootfs';
        let fileName = await downloadFile(downloadURL, folderLoc.tmp, localVersions.rootfs, updateVersions.rootfs);
  
        // Get the active JSON object
        let activeLocation = folderLoc.boot + 'active.json';
        let activeObj = require(activeLocation);
        let activeRootfs = activeObj.rootfs;
  
        // Get the active + inactive rootfs number and dev locations. Rootfs partitions are 2 and 3
        let activeRootfsDev, inactiveRootfs, inactiveRootfsDev;
        if(activeRootfs === 2){
          inactiveRootfs = 3;
          inactiveRootfsDev = folderLoc.device + inactiveRootfs;
          activeRootfsDev = folderLoc.device + activeRootfs;
        }
        else{
          inactiveRootfs = 2;
          inactiveRootfsDev = folderLoc.device + inactiveRootfs;
          activeRootfsDev = folderLoc.device + activeRootfs;
        }
  
        //Xdelta3: base file(current rootfs), delta, new file(inactive)
        await xdelta3.applyDelta(`${activeRootfsDev}`, `${folderLoc.tmp}${fileName}`, `${inactiveRootfsDev}`);
        
        //Set boot active.json (boot) to opposite(inactive) version
        activeObj.rootfs = inactiveRootfs;
        fs.writeFileSync(activeLocation, JSON.stringify(activeObj, null, 2), 'utf8'); //stringify last argument is spacing
  
        //Set /boot/cmdline.txt: root=/dev/{device}{inaktivPartition}
        let configFile = folderLoc.boot + 'cmdline.txt';
        let inactiveBlockDevName = 'mmcblk0p' + inactiveRootfsDev;
  
        fs.readFile(configFile, 'utf8', function (err, data) {
          if (err) {
            return err;
          }
          //Always mmcblk0p since this isn't required for qemu
          let result = data.replace(/(root=\/dev\/mmcblk0p)(\S*)*/g, `$1${inactiveRootfs}`);
          fs.writeFile(configFile, result, 'utf8', function (err) {
            if (err) return console.log(err);
            console.log('Done! Updated rootfs to version ' + updateVersions.rootfs);
            resolve(updateVersions.rootfs);
          });
        });
      }
      catch(err){
        console.log(err);
        reject(err);
      }
    }
    else{
      console.log('Rootfs already up to date with version ' + localVersions.rootfs);
      resolve(localVersions.rootfs);
    }
  });
}


module.exports = {
  updateKernel,
  updateApplication,
  updateRootfs
}