var mongoose = require("mongoose");

var Schema   = mongoose.Schema;

var file_info = new mongoose.Schema({
    filename : { type : String, unique : true },
    filesize : String,
    filetype : String,
    upload_type : String,
    date : String
});

var file_info = mongoose.model( 'file_info', file_info );

mongoose.connect('mongodb://localhost/File_Info');

exports.file_info = file_info;
