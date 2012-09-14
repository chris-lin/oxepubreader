
exports.index = function ( req, res ){
    var zipInfo = req.zipInfo;
    var zipEntries = zipInfo.zipEntries;
    var linksArray = [];
    var entriesLength = zipEntries.length;
    
    while ( entriesLength) {
        
        if (zipEntries[ entriesLength -1 ]['type'] == 'File' && zipEntries[ entriesLength -1 ]['path'].split('.').pop() == 'html') {
            linksArray.push(zipEntries[ entriesLength -1 ]['path']);
        }
        entriesLength--;
    };
    console.log(linksArray)
    
    req.session.book = {
        'name': zipInfo.name,
        'path': req.target,
        'links': linksArray.sort() 
    };
    res.redirect( '/reader' );
    
};

exports.read = function ( req, res ){
    //console.log(req.target)
    var bookinfo = req.session.book;
    
    req.session.currentPage = bookinfo.path + '/' + bookinfo.links[0].entryName;
    
    res.render('reader/reader', { 
        'title': 'OXEPUBREADER',
        'bookname': bookinfo.name,
        'path': bookinfo.path,
        'links': bookinfo.links 
    });
};

exports.getData = function ( req, res ){
    var bookinfo = req.session.book;
    //console.log(bookinfo.path);
    var fs = require("fs");
    var encode = "utf8";
    
    var file = bookinfo.path + '/' + req.body.page;
    
    fs.exists(file, function (exists) {
        if (exists) {
            fs.readFile(file, encode, function(err, file) {
            
                //res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(file);
                res.end();
            });
        }
    });
};

exports.test = function ( req, res ){
    var file = req.query.file;
    console.log(typeof(file));
    var fs = require("fs");
    fs.exists(file, function (exists) {
        util.debug(exists ? "it's there" : "no passwd!");
        if (exists) {
            console.log('yo');
        } else {
            console.log('no');
        }
    });
};
