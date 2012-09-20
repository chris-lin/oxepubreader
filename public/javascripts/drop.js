document.ondragover = function(e){e.preventDefault();};
document.ondrop = function(e){e.preventDefault();};

$(document).ready(function () {
  
    $('#dropArea')
    .on('dragover', function (e) {
        $(e.target).css('background-color','#D6F6FB');
        console.log('over');
        e.stopPropagation();
        e.preventDefault();  
    })
    .on('drop',function (e) {
        $(e.target).css('background-color','#7abcff')
       //console.log($(e.target));
        var files = e.originalEvent.dataTransfer.files;
        fileUpload(files)
        
        e.stopPropagation();
        e.preventDefault();
    })
    .on('dragend',function (e) {
        $(e.target).css('background-color','#7abcff');
        console.log('end');
        e.stopPropagation();
        e.preventDefault();
    });

    function fileUpload (files) {
        var formData = new FormData();

        for (var i = 0; i < files.length; i++) {
            console.log(files[i])
            formData.append('file', files[i]);
        }
        
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/ajaxUpload');
        xhr.onload = function(a) {
            var res = JSON.parse(xhr.response);
            
            //console.log('xhr onload');
            window.location.href ='/unzip?entry=' + res.target;
        };
        
        xhr.upload.onprogress = function (event) {
            if (event.lengthComputable) {
                var complete = (event.loaded / event.total * 100 | 0);
                console.log(complete);
            }
        }

        xhr.send(formData);
        
    }
});
