const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const versionUtil = require('../utils/VersionUtil');

router.post('/rootfs', function(req, res, next){
  res.send("tro på det ");
});

router.post('/boot', function(req, res, next){
  versionUtil.sendNewestFile('boot', req.body.localVersion, res);
});

router.post('/application', function(req, res, next){
  versionUtil.sendNewestFile('application', req.body.localVersion, res);
});

router.post('/kernel', function(req, res, next){
  versionUtil.sendNewestFile('kernel', req.body.localVersion, res);
});


module.exports = router;