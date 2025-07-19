$(window).scroll(function () {
    let wScroll = $(this).scrollTop()

    $('.hero').css({
        'background-size': 100 + wScroll/5 + '%',
    });


    $('.first-name').css({
        'right': 100 - wScroll/2 +'px'
    });

    $('.last-name').css({
        'left' : 100 - wScroll/2 + 'px'
    })
});