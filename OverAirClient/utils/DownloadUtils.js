const request = require('request');
const fs = require('fs');
const path = require('path');

let downloadURL = "http://localhost:3000/update/";

//Request type: application, boot, rootfs
function downloadFile(requestURI, requestObject, saveFileLocation) {
  let fileName;
  let r = request({
    url: downloadURL + requestURI,
    method: "POST",
    json: true,
    body: requestObject
  }).on('response', function (response) {
    if (response.statusCode == 200) {
      //Get the filename from headers
      fileName = response.headers["content-disposition"].replace(/.*filename="(.+)".*/, '$1');
      //Save file
      r.pipe(fs.createWriteStream(path.join(saveFileLocation, fileName)));
    }
    else {
      console.log('Status code ' + response.statusCode);
    }
  });
}

module.exports = {
  downloadFile
}