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
    let fileName = (fileType !== 'kernel' ? `${fileType}.${newVersion}.squashfs` : `Image.${newVersion}`);

    // Get the file in the correct folder
    await uploadedFile.mv(baseFolder + `/versions/${fileName}`);

    // Only generate deltas if older files exist
    if (newVersion !== 1) {
      generateDeltas(fileName, `${baseFolder}/versions/`, `${baseFolder}/delta/`);
    }
    res.render('success', {fileName: fileName});
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
    let newType = newFile.split('.')[0];
    let newVersion = newFile.split('.')[1];

    // Generate delta for every old -> new file
    filesArr.forEach(async (e) => {
      let fullOldPath = versionsFolder + e;
      let oldVersion = e.split('.')[1];

      // Delta name = type.oldVer.newVer.xdel
      // Full delta, path + delta navn
      let deltaName = `${newType}.${oldVersion}.${newVersion}.xdel`
      let fullDelta = `${deltaFolder}${deltaName}`
      await xdelta3.generateDelta(fullOldPath, newFull, fullDelta);
    });

  }
  catch (err) {
    return err;
  }
}

module.exports = {
  saveAndGenerateDelta
}