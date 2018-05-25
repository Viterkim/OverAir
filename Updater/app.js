const fs = require('fs');
const updateUtils = require('./utils/UpdateUtils');
const versionGrabber = require('./utils/VersionGrabber');
const folderLoc = require('./folderLocations');

async function update(){
    try{
        //Get local and remote versions
        let updateVersions = require(folderLoc.boot + 'update.json');
        let localVersions = versionGrabber.getJSONVersions();

        console.log(`Starting update process v.${localVersions.app}`);
        await updateUtils.updateKernel(localVersions, updateVersions);
        await updateUtils.updateApplication(localVersions, updateVersions);
        await updateUtils.updateRootfs(localVersions, updateVersions);
        console.log('Update process finished');
    }
    catch(err){
        console.log(err);
    }
}

update();