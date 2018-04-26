var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var shell = require('shelljs');

router.post('/boot', function(req, res, next){
  // let localObj = req.body.local;
  // let bootVersion = '' + localObj.bootVersion;
  let fileName = '1.jpg';
  let filePath = path.join(__dirname, '../files', '/boot/', fileName);
  console.log(filePath);
  res.download(filePath, fileName);
});

router.post('/rootfs', function(req, res, next){
  let localObj = req.body.local;
  let rootfsVersion = '' + localObj.rootfsVersion;

});

router.post('/application', function(req, res, next){
  let localObj = req.body.local;
  let localAppVersion = localObj.applicationVersion;

  //Returns the highest version number for the application
  let getServerApplicationVersion = function(){
    //Maybe use sync and promises instead?
    let folderPath = path.join(__dirname, '../files', '/application/');
    let versionsArr = fs.readdirSync(folderPath).map(function(file){
      return Number(file.split('.')[1]);
    });
    let highestVersion = Math.max(...versionsArr);
    return highestVersion;
  }
  let serverAppVersion = getServerApplicationVersion();

  //Compare local and server version
  if(localAppVersion >= serverAppVersion){
    res.send('Du skal sku da ha en sutter for du er up to date!')
  }
  else{
    let fileName = 'app.' + serverAppVersion.toString() + '.js';
    let filePath = path.join(__dirname, '../files', '/application/' , fileName);
    res.download(filePath, fileName);
  }
});


module.exports = router;