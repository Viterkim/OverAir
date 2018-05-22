const path = require('path');
const fs = require('fs');

//Returns the highest version number for the application (not used currently :-( )
function getServerSoftwareNewestVersion(subPath, localVersion){
  let folderPath;
  let versionsArr;
  let highestVersion;

  switch (subPath){
    case 'application':
      //Finds highest delta version file name (Name.from.to.xdel)
      folderPath = path.join(__dirname, '../files', subPath, 'delta');
      versionsArr = fs.readdirSync(folderPath).map(function(file){
        let deltaFrom = Number(file.split('.')[1]);
        if(deltaFrom === localVersion){
          let deltaTo = Number(file.split('.')[2]);
          return deltaTo;
        }
        return 0;
      });
      highestVersion = '' + localVersion + '.' + Math.max(...versionsArr);

      break;
    case 'kernel':
      //Finds highest kernel version (Name.version)
      folderPath = path.join(__dirname, '../files', subPath);
      versionsArr = fs.readdirSync(folderPath).map(function(file){
        return Number(file.split('.')[1]);
      });
      highestVersion = Math.max(...versionsArr);
      break;
  }
  
  return highestVersion;
}

function sendNewestFile(type, body, res){
  if(body.localVersion === undefined){
    res.status(404).send('Not Found');
  }
  // let serverVersion = getServerSoftwareNewestVersion(type, localVersion);
  let localVersion = body.localVersion;
  let serverVersion = body.requestedVersion;
  
  //Compare local and server version
  if(localVersion >= serverVersion){
    res.status(204).send('Already up to date');
  }
  else{
    let fileName;
    switch(type){
      case 'app':
        fileName = '/delta/' + 'app.' + localVersion + '.' + serverVersion + '.xdel';
        break;
      case  'rootfs':
        fileName = '/delta/' + 'rootfs.' + localVersion + '.' + serverVersion + '.xdel';
        break;
      case  'kernel':
      fileName = '/delta/' + 'Image.' + localVersion + '.' + serverVersion + '.xdel';
        break;
    }
    let filePath = path.join(__dirname, '../files', type, fileName);
    res.download(filePath, fileName);
  }
}

module.exports = {
  sendNewestFile
};