const path = require('path');
const fs = require('fs');
const versionUtils = require('./VersionUtils');
const xdelta3 = require('./Xdelta3Utils');

async function saveAndGenerateDelta(res, uploadedFile, fileType) {
  try {
    let baseFolder = path.join(__dirname, '../files', fileType);
    let currentVersion = versionUtils.getNewestVersion(fileType);
    let newVersion = currentVersion + 1;
    // Kernel files are called 'Image', other files have .squashfs at the end
    let fileName = (fileType !== 'kernel' ? `${fileType}.${newVersion}.squashfs` : `Image${newVersion}`);

    // Get the file in the correct folder
    await uploadedFile.mv(baseFolder + `/versions/${fileName}`);

    // Måske await?????
    generateDeltas(fileName, `${baseFolder}/versions/`, `${baseFolder}/delta/`);
    res.send('File uploaded!');
  }
  catch (err) {
    return res.status(500).send(err);
  }
}

async function generateDeltas(newFile, versionsFolder, deltaFolder) {
  try {
    // Get array of all files in versionsFolder which don't have the name newFile
    let filesArr = fs.readdirSync(versionsFolder).filter(function (file) {
      if (file !== newFile) {
        return true;
      }
    });

    // Full path to the new file
    let newFull = versionsFolder + newFile;


    // Generate delta for every old -> new file
    filesArr.forEach(e => {
      // Full path to every 'old' file
      let fullOld = versionsFolder + e;
      
      // Delta name = type.gammel.ny.xdel
      // Full delta, path + delta navn
      let fullDelta = `${deltaFolder}`
      xdelta3.generateDelta(fullOld, newFull, fullDeta);
    });
    
  }
  catch (err) {
    return res.status(500).send(err);
  }
}

module.exports = {
  saveAndGenerateDelta
}