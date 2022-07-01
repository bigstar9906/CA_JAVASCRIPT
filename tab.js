var current_tab=1;
var button = $('.tab-button');
var content = $('.tab-content');


$('.list').click(function(e){
    open_tab(parseInt( e.target.dataset.id));
    
});

function open_tab(num)
{
    button.eq(current_tab).removeClass('orange');
    content.eq(current_tab).removeClass('show');
    button.eq(num).addClass('orange');
    content.eq(num).addClass('show');
    current_tab = num;
}