
/*
 * GET home page.
 */

exports.index = function(req, res){
    //res.redirect( '/unzip?entry=./data/book1.zip' );
    res.render('index', { title: 'Express' })

};

