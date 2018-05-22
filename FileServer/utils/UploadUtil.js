const path = require('path');
const fs = require('fs');

function saveAndGenerateDelta(uploadedFile, fileType) {
  let baseFolder = path.join(__dirname, '../files', fileType);

  console.log(baseFolder);

  // switch(fileType) {
  //   case 'rootfs':
  //     break;
  //   case 'kernel':
  //     break;
  //   case 'app':
  //     break;
  // }
  // sampleFile.mv('/somewhere/on/your/server/filename.jpg', function (err) {
  //   if (err) {
  //     return res.status(500).send(err);
  //   }


  //   res.send('File uploaded!');
  // });
}

module.exports = {
  saveAndGenerateDelta
}