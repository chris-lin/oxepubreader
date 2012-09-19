
exports.index = function (req, res) {
    res.render('fileupload/index', {});
};

exports.fileupload = function (req, res) {


    var fs = require('fs');
    var tmpFile = req.files.files;
    var tmpPath = tmpFile.path
    var targetPath = "./data/" + tmpFile.name;
    if (tmpFile.type != 'application/zip') {
        
        fs.unlink(tmpPath, function () {
            res.redirect('/');
            return false;
        })
        
        
    };
    fs.rename(tmpPath , targetPath , function (err) {
        if(!err){
            res.redirect('/unzip?entry=' + targetPath );
        } else {
            console.log(err);
            res.redirect('/');
        }
    });
}
