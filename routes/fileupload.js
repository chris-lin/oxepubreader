
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
