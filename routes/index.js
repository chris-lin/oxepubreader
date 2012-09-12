
/*
 * GET home page.
 */

exports.index = function(req, res){
    //res.redirect( '/unzip?entry=./data/book1.zip' );
    res.render('index', { title: 'Express' })
};

exports.home = function(req,res){
    var i,
        target_path;
    var result=new Array();
    var fs = require('fs');
    console.log(req.files.files);
    var tmp_path=req.files.files[0].path;
    target_path="/data/oxenote/"+req.files.files[0].name;
    fs.rename(tmp_path , target_path , function(err){
    //   if (err) throw err;
        fs.unlink(tmp_path,function(){
            result[0]={"errorThrown":"abort"}
            //   if(err) throw err;
            return req;
        });
    });
};
