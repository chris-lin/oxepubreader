//  Unzip File 

var zipDirectory = 'data/books/';

exports.unzip = function ( req, res, next ) {
    var fs = require("fs");
    var unzip = require("unzip");
    
    var filepath = req.query.entry;
    var filename = filepath.split('/').pop();
    var zipInfo = {
        'name': filename,
        'zipEntries' : []
    }

    req.target = zipDirectory + filename ;
    
    //  Extract File
    fs.mkdir(req.target, '0777', function () {
        fs.createReadStream( req.query.entry ).pipe( unzip.Extract({ 'path': req.target }) );
        parse();
    });
    
    //  parse zip entry
    function parse ( file ) {
        fs.createReadStream( req.query.entry ).pipe(unzip.Parse())
            .on('entry', function (entry) {
                zipInfo.zipEntries.push({
                    'path': entry.path,
                    'type': entry.type,
                    'size': entry.size
                })
            })
            .on('end', function () {
                req.zipInfo = zipInfo;
                next();
            });
    }
};


/*
exports.unzip = function ( req, res, next ){
    
    var AdmZip = require('adm-zip');
    console.log('entry: ', req.query.entry);
    console.log('target: ', req.query.target);
    var filename = req.query.entry.split('/').pop();
    
    //filename = filename.toString();
    console.log('filename = ' + filename);
    //if (!target) {
    req.target = req.query.target = 'data/books/' + filename ;
    //}
  
    // reading archives
    var entryFile = req.query.entry;
    //entryFile = './test.zip'
    var unzip = new AdmZip( entryFile );
    
    var zipEntries = unzip.getEntries(); // an array of ZipEntry records

    
    
    //~ zipEntries.forEach(function(zipEntry) {
        //~ //console.log(zipEntry.entryName); // outputs zip entries information
        //~ console.log(zipEntry.data)
    //~ });
    
    
    req.bookname = filename.split('.')[0];
    unzip.extractAllTo(req.target, true);
    req.zipEntries = zipEntries;
    
    next();
};
*/

/*
exports.zip = function ( req, res ){
    //  ZIP
    var fs = require("fs");
    var zip = require("node-native-zip");

    var archive = new zip();

    archive.addFiles([ 
        { name: "moehah.txt", path: "./testCase/zip/moehah.txt" },
        { name: "images/suz.jpg", path: "./testCase/zip/images.jpg" }
    ], function (err) {
        if (err) return console.log("err while adding files", err);

        var buff = archive.toBuffer();

        fs.writeFile("./testCase/test.zip", buff, function () {
            console.log("File ./testCase/test.zip Finished");
        });
    });
};
*/
