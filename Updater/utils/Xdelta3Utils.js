let spawn = require('child_process').spawn;

function applyDelta(baseFilePath, deltaPath, newFilePath) {
    return new Promise((resolve, reject) => {
      //Apply the patch requiring the full path to all files
      let child = spawn('xdelta3', ['-f', '-d', '-s', baseFilePath, deltaPath, newFilePath]);
  
      child.stderr.on('data', (data) => {
        reject('Xdelta3 error: ' + data);
      });
  
      //When xdelta is done, cleanup the patch file
      child.on('exit', function () {
        spawn('rm', [deltaPath]);
        resolve('exit');
      });
    });
  }

module.exports = {
    applyDelta
}