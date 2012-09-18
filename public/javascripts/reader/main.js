$(document).ready(function () {
    $("body").css({ "-webkit-user-select": "none" });
    var page = new Page( );
    
    page.initFirstPage();
    togglePrevious(page.isPrevious);
    toggleNext(page.isNext)
    
    $('.pageButton').on('mousedown', function () {
        var pageNumber = $(this).attr('data-pageNumber');
        page.changePage(pageNumber);
        togglePrevious(page.isPrevious);
        toggleNext(page.isNext)
    });
    
    $('#home').on('mousedown', function () {
        page.initFirstPage();
    });
    
    $('.pageTurnArea').on('mousedown', function () {
        if ( $(this).hasClass('arrowLeft')) {
            console.log(page.currentPageNum)
            page.changePage(page.currentPageNum - 1 );
            togglePrevious(page.isPrevious);
            toggleNext(page.isNext)
        } else {
            console.log('right')
            page.changePage(page.currentPageNum + 1 );
            togglePrevious(page.isPrevious);
            toggleNext(page.isNext)
        }
    });
    
    
    function togglePrevious ( status ) {
        if ( status ) {
            $('.arrowLeft').show();
            
        } else {
            $('.arrowLeft').hide();
        }
    };
    
    function toggleNext ( status ) {
        if ( status ) {
            $('.arrowRight').show();
        } else {
            $('.arrowRight').hide();
        }
    }
});




var Page = function () {
    var self = this;
    this.pages = {};
    this.currentPageNum = 0;
    this.pageLength = 0;
    this.isPrevious = false;
    this.isNext = false;
    $('.pageButton').each(function (index) {
        self.pages[index] = $(this).text();
        self.pageLength++;
    });

};
Page.prototype.initFirstPage = function () {
    this.changePage(0);
}
Page.prototype.changePage = function ( pageNum ) {
    if (pageNum <= 0) {
        this.isPrevious = false;
    } else {
        this.isPrevious = true;
    }
    if (pageNum == ( this.pageLength -1 )) {
        this.isNext = false;
    } else {
        this.isNext = true;
    }
    this.currentPageNum = pageNum; 
    var page = this.pages[pageNum];
    var container = $('#nodeReaderIframe')[0].contentWindow.document;
    
    var request = $.ajax({
        url: "/getData",
        type: "POST",
        data: {page : page},
        dataType: "html"
    });
    
    request.done(function(msg) {
        $('body', container).html(msg);
        var sourceHeight = $('body', container).height();
        $('#nodeReaderIframe').height(sourceHeight + 100);
        //console.log( sourceHeight );
    });
    
    request.fail(function(jqXHR, textStatus) {
        alert( "Request failed: " + textStatus );
    });
} 
