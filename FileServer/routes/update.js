const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const downloadUtils = require('../utils/DownloadUtils');

router.post('/rootfs', function(req, res, next){
  downloadUtils.sendNewFile('rootfs', req.body, res);
});

router.post('/app', function(req, res, next){
  downloadUtils.sendNewFile('app', req.body, res);
});

router.post('/kernel', function(req, res, next){
  downloadUtils.sendNewFile('kernel', req.body, res);
});


module.exports = router;