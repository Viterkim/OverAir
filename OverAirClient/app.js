var request = require('request');
var fs = require('fs');
var path = require('path');

// Get version numbers from local files
let downloadLocation = "http://localhost:3001/update/";
let myJSONObject = {
  "bootVersion": 2,
  "rootfsVersion": 1,
  "applicationVersion": 3
};

//Request type: application, boot, rootfs
function downloadFile(saveFileLocation, requestType){
  let fileName;
  let r = request({
    url: downloadLocation + requestType,
    method: "POST",
    json: true,
    body: myJSONObject
  }).on('response', function(response){
    //Get the filename from headers
    fileName = response.headers["content-disposition"].replace(/.*filename="(.+)".*/, '$1');
    //Save file
    r.pipe(fs.createWriteStream(path.join(saveFileLocation, fileName)));
  });
}


downloadFile('E:/', 'boot');