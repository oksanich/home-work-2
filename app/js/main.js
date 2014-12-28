$(document).ready(function(){

    $('.slideshow__pic').on('click', function(e){
       e.preventDefault();

        var $this = $(this),
            item = $this.closest('.slideshow__item'),
            container = $this.closest('.slideshow'),
            display = container.find('.slideshow_display'),
            path = item.find('img').attr('src'),
            duration = 300;

        if(!item.hasClass('active')){
            item.addClass('active').siblings().removeClass('active');

            display.find('img').fadeOut(duration, function(){
                $(this).attr('src', path).fadeIn(duration);
            });
        }
   });

    //fade in/out based on scrollTop value
    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $('.scroll-up').fadeIn();
        } else {
            $('.scroll-up').fadeOut();
        }
    });

    // scroll body to 0px on click
    $('.scroll-up').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 400);
        return false;
    });
});
