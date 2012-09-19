var fs = require("fs");

exports.index = function ( req, res ){
    var zipInfo = req.zipInfo;
    var zipEntries = zipInfo.zipEntries;
    var linksArray = [];
    var entriesLength = zipEntries.length;
    
    var format = ['html', 'xhtml'];
    
    function checkFormat ( subname ) {
       
        for (var i = 0;i<format.length;i++) {
            console.log('-' + subname + '-')
            if (format[i] == subname ) {
                return true;                  
            }
        }
        return false;
    }
    
    while ( entriesLength) {
        var subName = zipEntries[ entriesLength -1 ]['path'].split('.').pop();

        if (zipEntries[ entriesLength -1 ]['type'] == 'File' && checkFormat(subName)) {
            linksArray.push(zipEntries[ entriesLength -1 ]['path']);
        }
        entriesLength--;
    };
    //console.log(linksArray)
    
    req.session.book = {
        'name': zipInfo.name.split('.').shift(),
        'path': req.target,
        'links': linksArray.sort() 
    };
    res.redirect( '/reader' );
    
};

exports.read = function ( req, res ){
    console.log(req.session.book)
    if (req.session.book != undefined ) {
        var bookinfo = req.session.book;
        
        req.session.currentPage = bookinfo.path + '/' + bookinfo.links[0].entryName;
        
        res.render('reader/reader', { 
            'title': 'OXEPUBREADER',
            'bookname': bookinfo.name,
            'path': bookinfo.path,
            'links': bookinfo.links 
        });
    } else {
        res.redirect( '/' );
    }
   
};

exports.getData = function ( req, res ){
    var bookinfo = req.session.book;
    //console.log(bookinfo.path);
    //var fs = require("fs");
    var encode = "utf8";
    
    var file = bookinfo.path + '/' + req.body.page;
    
    fs.exists(file, function (exists) {
        if (exists) {
            fs.readFile(file, encode, function(err, file) { 
                res.write(file);
                res.end();
            });
        }
    });
};

