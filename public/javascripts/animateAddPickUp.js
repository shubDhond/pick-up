$(document).ready(function(){
    function slideAdd(event){
        event.preventDefault();

        var slideOutMenu = $('.add-pickUp');

        slideOutMenu.toggleClass('open');
        $('.add-pick-up').parent().toggleClass('active');
        $('.profile').parent().removeClass('active');
        $('.find-pick-up').parent().removeClass('active');



        if(!slideOutMenu.hasClass('open')){
            slideOutMenu.css({
                'left': '-10%',
                'transition': 'left 0.5s'
            });
            $('.overlay').css({
                'display': 'none'
            });
        }
        else{
            slideOutMenu.css({
                'left': '20%',
                'transition': 'left 0.5s'
            });
            $('.overlay').css({
                'display': 'block'
            });
        }
    };

    $('.add-pick-up').on('click',slideAdd);
    $('.overlay').on('click',slideAdd);
});