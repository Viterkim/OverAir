const shell = require('./ShellUtils');

async function applyDelta(baseFilePath, deltaPath, newFilePath){
    //Apply the patch requiring the full path to all files
    await shell.runCommand(`xdelta3 -d -s ${baseFilePath} ${deltaPath} ${newFilePath}`);

    //Cleanup
    await shell.runCommand(`rm ${deltaPath}`);
}

module.exports = {
    applyDelta
}