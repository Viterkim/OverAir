let exec = require('child_process').exec, child;

function runFile(file) {
  return new Promise(resolve => {
    child = exec('sh ' + file,
      function (error, stdout, stderr) {
        // console.log(stdout);
        // if (stderr !== null) {
        //   console.log('std error: ' + stderr);
        // }
        if (error !== null) {
          console.log('exec error: ' + error);
        }
      });
      resolve(stdout);
    });
}

function runCommand(command) {
  return new Promise(resolve => {
    child = exec(command,
      function (error, stdout, stderr) {
        // console.log(stdout);
        // if (stderr !== null) {
        //   console.log('std error: ' + stderr);
        // }
        if (error !== null) {
          console.log('exec error: ' + error);
        }
        resolve(stdout);
      });
  });
}

module.exports = {
  runFile,
  runCommand
}