const spawn = require('child_process').spawn;

// Not used on the backend
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

function generateDelta(oldFileLocation, newFileLocation, deltaSaveLocation) {
  return new Promise((resolve, reject) => {
    //xdelta3 -9 -S djw -f -s File.1 File.2 patch.xdel
    let child = spawn('xdelta3', ['-9', '-S', 'djw', '-f' , '-s', oldFileLocation, newFileLocation, deltaSaveLocation]);

    child.stderr.on('data', (data) => {
      reject('Xdelta3 error: ' + data);
    });

    child.on('exit', function () {
      resolve('exit');
    });
  });
}

module.exports = {
  applyDelta,
  generateDelta
}