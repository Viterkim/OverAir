const path = require('path');
const fs = require('fs');

//Returns the highest version number for the application
function getServerSoftwareNewestVersion(subPath){
  //Maybe use sync and promises instead?
  let folderPath = path.join(__dirname, '../files', subPath);
  let versionsArr = fs.readdirSync(folderPath).map(function(file){
    return Number(file.split('.')[1]);
  });
  let highestVersion = Math.max(...versionsArr);
  return highestVersion;
}

function sendNewestFile(type, localVersion, res){
  if(localVersion === undefined){
    res.status(404).send('Not Found');
  }
  let serverVersion = getServerSoftwareNewestVersion('/' + type + '/');
  
  //Compare local and server version
  if(localVersion >= serverVersion){
    res.status(204).send('Already up to date');
  }
  else{
    let fileName;
    switch(type){
      case 'application':
        fileName = 'app.' + serverVersion + '.js';
        break;
      case  'boot':
        fileName = 'uboot.' + serverVersion + '.img';
        break;
      case  'kernel':
        fileName = 'zImage.' + serverVersion;
        break;
    }
    let filePath = path.join(__dirname, '../files', '/' + type + '/' , fileName);
    res.download(filePath, fileName);
  }
}

function diffShit(){
  console.log("generate diff");
}

module.exports = { 
  getServerSoftwareNewestVersion,
  sendNewestFile
};