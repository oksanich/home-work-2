$(document).ready(function(){

    //Gallery

    $('.slideshow-carousel__pic').on('click', function(e){
       e.preventDefault();

        var $this = $(this),
            item = $this.closest('.slideshow-carousel__item'),
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


    //Scroll-up

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

    //Carousel

    //move the last list item before the first item. The purpose of this is if the user clicks previous he will be able to see the last item.
    $('.slideshow-carousel__item:first').before($('.slideshow-carousel__item:last'));

    $('.slideshow-carousel__right').click(function(){

        //get the width of the items ( i like making the jquery part dynamic, so if you change the width in the css you won't have o change it here too ) '
        var item_width = $('.slideshow-carousel__item').outerWidth() + 10;

        //calculate the new left indent of the unordered list
        var left_indent = parseInt($('.slideshow-carousel__list').css('left')) - item_width;

        //make the sliding effect using jquery's anumate function '
        $('.slideshow-carousel__list').animate({'left' : left_indent},{queue:false, duration:500},function(){

            //get the first list item and put it after the last list item (that's how the infinite effects is made) '
            $('.slideshow-carousel__item:last').after($('.slideshow-carousel__item:first'));

            //and get the left indent to the default -800px
            $('.slideshow-carousel__list').css({'left' : '-84px'});
        });
    });

    //when user clicks the image for sliding left
    $('.slideshow-carousel__left').click(function(){

        var item_width = $('.slideshow-carousel__item').outerWidth() + 10;

        /* same as for sliding right except that it's current left indent + the item width (for the sliding right it's - item_width) */
        var left_indent = parseInt($('.slideshow-carousel__list').css('left')) + item_width;

        $('.slideshow-carousel__list').animate({'left' : left_indent},{queue:false, duration:500},function(){

            /* when sliding to left we are moving the last item before the first item */
            $('.slideshow-carousel__item:first').before($('.slideshow-carousel__item:last'));

            /* and again, when we make that change we are setting the left indent of our unordered list to the default -80px */
            $('.slideshow-carousel__list').css({'left' : '-84px'});
        });

    });

});
