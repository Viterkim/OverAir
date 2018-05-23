const path = require('path');
const fs = require('fs');

function getNewestVersion(fileType){
  let folderPath;
  let versionsArr;
  let highestVersion;

  //Finds highest version (Name.version.filetype)
  folderPath = path.join(__dirname, '../files/', fileType, 'versions');
  versionsArr = fs.readdirSync(folderPath).map(function(file){
    let num = Number(file.split('.')[1]);
    // Checks the files version isn't 'wrong', returns 0 if it is
    if(isNaN(num) || num === undefined){
      return 0;
    }
    return Number(file.split('.')[1]);
  });
  highestVersion = Math.max(...versionsArr);
  return highestVersion;
}


module.exports = {
  getNewestVersion
};