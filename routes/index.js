
/*
 * GET home page.
 */

exports.index = function(req, res){
    //res.redirect( '/unzip?entry=./data/book1.zip' );
    //res.redirect( '/unzip?entry=./data/Kite.zip' );
    res.render('index', { title: 'OXEPUBREADER' })
};

