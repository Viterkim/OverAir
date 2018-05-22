const express = require('express');
const router = express.Router();
const uploadUtil = require('../utils/UploadUtil');

router.get('/', function(req, res, next) {
  res.render('upload');
});

router.post('/', function(req, res, next){
  if (!req.files){
    return res.status(400).send('No files were uploaded.');
  }
  let uploadedFile = req.files.file;
  let fileType = req.body.fileType;
  uploadUtil.saveAndGenerateDelta(uploadedFile, fileType);
  res.send('File uploaded!');
});

module.exports = router;