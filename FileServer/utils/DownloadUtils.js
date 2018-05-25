const path = require('path');
const fs = require('fs');

function sendNewFile(type, body, res){
    if(body.localVersion === undefined){
        res.status(404).send('Not Found');
    }
    let localVersion = body.localVersion;
    let serverVersion = body.requestedVersion;

    //Compare local and server version
    if(localVersion >= serverVersion){
        res.status(204).send('Already up to date');
    }
    else{
        let fileName;
        switch(type){
        case 'app':
            fileName = '/delta/' + 'app.' + localVersion + '.' + serverVersion + '.xdel';
            break;
        case  'rootfs':
            fileName = '/delta/' + 'rootfs.' + localVersion + '.' + serverVersion + '.xdel';
            break;
        case  'kernel':
        fileName = '/delta/' + 'Image.' + localVersion + '.' + serverVersion + '.xdel';
            break;
        }
        let filePath = path.join(__dirname, '../files', type, fileName);
        res.download(filePath, fileName);
    }
}

module.exports = {
    sendNewFile
}