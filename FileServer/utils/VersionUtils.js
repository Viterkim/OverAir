const path = require('path');
const fs = require('fs');

function getNewestVersion(fileType){
  let folderPath;
  let fileArr;
  let versionsArr;
  let highestVersion = 0;

  //Finds highest version (Name.version.filetype)
  folderPath = path.join(__dirname, '../files/', fileType, 'versions');
  fileArr = fs.readdirSync(folderPath);

  //Checks if the folder of files is empty, return highestVersion as 0
  if(fileArr.length > 0){
    versionsArr = fileArr.map(function(file){
      let num = Number(file.split('.')[1]);
      // Checks the old file names, returns 0 if the file doesn't exist / name is wrong
      if(Number.isNaN(num) || num === undefined){
        return 0;
      }
      // Returns the highest version currently
      return Number(file.split('.')[1]);
    });

    highestVersion = Math.max(...versionsArr);
  }
  return highestVersion;
}


module.exports = {
  getNewestVersion
};