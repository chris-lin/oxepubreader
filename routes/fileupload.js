
exports.index = function (req, res) {
    res.render('fileupload/index', {});
};

exports.fileupload = function (req, res) {

    var fs = require('fs');
    var tmpFile = req.files.files;
    var tmpPath = tmpFile.path;
    var uploadDir = './data/';
    var targetPath = uploadDir + tmpFile.name;

    switch (tmpFile.type) {
        case 'application/epub+zip': 
            var tmpArray = tmpFile.name.split('.');
            var tmpName = '';
            for ( i=0;i<(tmpArray.length - 1);i++ ) {
                tmpName += tmpArray[i];
            };
            targetPath = uploadDir + tmpName + '.zip';
            //console.log(targetPath);
            break;
        case 'application/zip':
            //console.log('zip');
            break;
        default:
            fs.unlink(tmpPath, function () {
                res.redirect('/');
                return false;
            });
            return false;
    }
    fs.rename(tmpPath , targetPath , function (err) {
        if(!err){
            res.redirect('/unzip?entry=' + targetPath );
        } else {
            console.log(err);
            res.redirect('/');
        }
    });
}


exports.ajaxUpload = function (req, res) {
 
    

    var fs = require('fs');
    var tmpFile = req.files.file;
    var tmpPath = tmpFile.path;
    var uploadDir = './data/';
    var targetPath = uploadDir + tmpFile.name;
    
    var fileInfo = {
        filename: tmpFile.name,
        success: false,
        error: false,
        status:'',
        target: targetPath
    };
    
    switch (tmpFile.type) {
        case 'application/epub+zip': 
            var tmpArray = tmpFile.name.split('.');
            var tmpName = '';
            for ( i=0;i<(tmpArray.length - 1);i++ ) {
                tmpName += tmpArray[i];
            };
            fileInfo.target = targetPath = uploadDir + tmpName + '.zip';
            
            break;
        case 'application/zip':
            //console.log('zip');
            break;
        default:
            fs.unlink(tmpPath, function () {
                fileInfo.error = true;
                fileInfo.status = 'file type wrong';
                //res.redirect('/');
                return false;
            });
            return false;
    }
    
    fs.rename(tmpPath , targetPath , function (err) {
        if(!err){
            fileInfo.success = true;
            fileInfo.status = 'upload done';
            //res.redirect('/unzip?entry=' + targetPath );
            
        } else {
            fileInfo.error = true;
            fileInfo.status = err;
            console.log(err);
            //res.redirect('/');
        }
        setTimeout(function () {
            var msg = JSON.stringify(fileInfo);
            //console.log(msg)
            res.writeHead(200, {"Content-Type":"application/json; charset=utf-8","Content-Length":msg.length});
            res.end(msg);
        }, 500);
        
    });
   
    
    
    
}
