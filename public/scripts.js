let search = $("#livesearch");
let searchInput = $("#searchInput");


//------------------------------Dinamização da tela-------------------------------------//
$(function() {
    menu = $('nav ul');

    $('#toggle-btn').on('click', function(e) {
        e.preventDefault();
        menu.slideToggle();
    });

    $(window).resize(function() {
        var w = $(this).width();
        if(w > 580 && menu.is(':hidden')) {
            menu.removeAttr('style');
        }
    
    });

    $('nav li').on('click', function(e) {
        var w = $(window).width();
        if(w < 580) {
            menu.slideToggle();
        }
    });
    $('.open-menu').height($(window).height());
});


//------------------------------Barra de sugestões para pesquisa-------------------------------------//

function showResults(str){
    if (str.length === 0){
        search.addClass("hide");
    }else{
        search.removeClass("hide");
    }

    $.ajax({
        url: "/",
        contentType: "application/json",
        method: "POST",
        data: JSON.stringify({query: str}),
        success: function(result){
            search.html(result.response);
        }
    })
}

function callName(str){
    searchInput.val(str);
    showResults(str);
    search.addClass("hide");
}

