$(document).ready(function () {
    

    $('.pageButton').on('click', function () {
        var page = $(this).text();
        var container = $('#nodeReaderIframe')[0].contentWindow.document;
        $('head', container).append('<link href="/stylesheets/readerContainer.css" rel="stylesheet">');
        var request = $.ajax({
            url: "/getData",
            type: "POST",
            data: {page : page},
            dataType: "html"
        });
        
        request.done(function(msg) {
            
            $('body', container).html(msg);
            //console.log( msg );
        });
        
        request.fail(function(jqXHR, textStatus) {
            alert( "Request failed: " + textStatus );
        });
        /*
        console.log($(this).text())
        
        
        var body = $('body', xx);
        $(body).html('<h1>Test</h1>');
        */
　　　　　//$('#nodeReader_container')[0].contentDocument.location.href('http://127.0.0.1:3000/getData?page=page2.html'); 
    });
})



