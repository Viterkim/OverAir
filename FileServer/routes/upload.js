const express = require('express');
const router = express.Router();
const uploadUtils = require('../utils/UploadUtils');

router.get('/', function(req, res, next) {
  res.render('upload');
});

router.post('/', function(req, res, next){
  if (!req.files){
    return res.status(400).send('No files were uploaded.');
  }
  let uploadedFile = req.files.file;
  let fileType = req.body.fileType;
  uploadUtils.saveAndGenerateDelta(res, uploadedFile, fileType);
});

module.exports = router;