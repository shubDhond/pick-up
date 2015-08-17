$(document).ready(function(){
    function slideAdd(event){
        event.preventDefault();

        var addPopup = $('.add-pickUp');
        var navbar = $('#navbar');

        addPopup.toggleClass('open');


        if(!addPopup.hasClass('open')){
            addPopup.css({
                'display': 'none'
            });
            $('.overlay').css({
                'display': 'none'
            });
        }
        else{
            addPopup.css({
                'display': 'block'
            });
            $('.overlay').css({
                'display': 'block'
            });
            navbar.toggleClass('in');
        }
    };

    $('.add-pick-up').on('click',slideAdd);
    $('.overlay').on('click',slideAdd);

    $(".nav a").on("click", function(){
        $(".nav").find(".active").removeClass("active");
        $(this).parent().addClass("active");
    });
});