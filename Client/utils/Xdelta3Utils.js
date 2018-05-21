const spawn = require('child_process').spawn;

function applyDelta(baseFilePath, deltaPath, newFilePath){
    return new Promise(resolve => {
        //Apply the patch requiring the full path to all files
        let child = spawn('xdelta3', ['-d', '-s', baseFilePath, deltaPath, newFilePath]);
        
        //When xdelta is done, cleanup the patch file
        child.on('exit', function(){
            spawn('rm', [deltaPath]);
            resolve('exit');
        });
    });
}

module.exports = {
    applyDelta
}