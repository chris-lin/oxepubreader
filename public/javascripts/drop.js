

$(document).ready(function () {
    document.ondragover = function(e){e.preventDefault();};
    document.ondrop = function(e){e.preventDefault();};
    $('#dropArea')
    .on('dragover', function (e) {
        $(e.target).css('background-color','rgba(210, 250, 250, 0.8)');
        //console.log('over');
        e.stopPropagation();
        e.preventDefault();  
    })
    .on('drop',function (e) {
        $(e.target).css('background-color','rgba(255, 255, 255  , 0)');
       //console.log($(e.target));
        var files = e.originalEvent.dataTransfer.files;
        var subname = files[0].name.split('.').pop();
        
        if (subname == 'zip' || subname =='epub') {
            fileUpload(files);
        };
        e.stopPropagation();
        e.preventDefault();
    })
    .on('dragend',function (e) {
        $(e.target).css('background-color','rgba(210, 250, 250, 0)');
        console.log('end');
        e.stopPropagation();
        e.preventDefault();
    })
    .on('dragstart', function(e){
        e.preventDefault();
    });

    function fileUpload (files) {
        var formData = new FormData();

        for (var i = 0; i < files.length; i++) {
            //console.log(files[i])
            formData.append('file', files[i]);
        }
        
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/ajaxUpload');
        xhr.onreadystatechange = function() {
            
            if (xhr.readyState == 4) {
                if (xhr.responseText != ""){
                    content = JSON.parse(xhr.responseText); 
                    if (content.success) {
                        window.location.href ='/unzip?entry=' + content.target;
                    } else {
                        $('.dropProgress span').css({'width': '0'});
                    }
                   
                }else{
                    console.log( locale_filename + " : File Not Found or Worng Format");
                };
            };
        }
        xhr.upload.onprogress = function (event) {
            $('.dropProgress span').css({'width': (event.loaded / event.total * 100) + '%'});
            if (event.lengthComputable) {
                var complete = (event.loaded / event.total * 100 | 0);
                console.log(complete);
            }
        }

        xhr.send(formData);
        
    }
});
