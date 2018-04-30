let exec = require('child_process').exec, child;


function runFile(file) {
  child = exec('sh ' + file,
    function (error, stdout, stderr) {
      console.log(stdout);
      // if (stderr !== null) {
      //   console.log('std error: ' + stderr);
      // }
      if (error !== null) {
        console.log('exec error: ' + error);
      }
    });
}

function runCommand(command) {
  child = exec(command,
    function (error, stdout, stderr) {
      console.log(stdout);
      // if (stderr !== null) {
      //   console.log('std error: ' + stderr);
      // }
      if (error !== null) {
        console.log('exec error: ' + error);
      }
    });
}

module.exports = {
  runFile,
  runCommand
}