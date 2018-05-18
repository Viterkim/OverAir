const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const versionUtil = require('../utils/VersionUtil');

router.post('/rootfs', function(req, res, next){
  versionUtil.sendNewestFile('rootfs', req.body, res);
});

router.post('/application', function(req, res, next){
  versionUtil.sendNewestFile('application', req.body, res);
});

router.post('/kernel', function(req, res, next){
  versionUtil.sendNewestFile('kernel', req.body, res);
});


module.exports = router;