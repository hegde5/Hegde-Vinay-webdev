/**
 * Created by Vinay on 11/29/2016.
 */
$(document).ready(function() {

    // import view port library function
    jQuery.extend(verge);

    // smooth scrolling of viewport to target
    $('a[href^="#"]').click(function(event) {
        event.preventDefault();
        $('html,body').animate({
            scrollTop: $(this.hash).offset().top - 50
        }, 900);
    });

    $('#down').click(function() {
        $('html,body').animate({
            scrollTop: $('#about').offset().top - 50
        }, 900);
    });

    var currentTime = new Date();
    var year = currentTime.getFullYear();

    // add listener to all the cards for click flipping
    function addListener() {
        var cards = document.querySelectorAll(".card.effect_click");

        for (var i = 0; i < cards.length; i++) {
            clickListener(cards[i]);
        }

        function clickListener(card) {
            card.addEventListener("click", function() {
                this.classList.toggle("flipped");
            });
        }
    }

    addListener();


    // turn on bootstrap tooltips
    $('[data-toggle="tooltip"]').tooltip();

});