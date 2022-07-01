var current_tab=1;
var button = $('.tab-button');
var content = $('.tab-content');
for(let i=0;i<3;i++)
{
button.eq(i).on('click',function(){
    button.eq(current_tab).removeClass('orange');
    content.eq(current_tab).removeClass('show');
    button.eq(i).addClass('orange');
    content.eq(i).addClass('show');
    current_tab = i;
});
}
// button.eq(1).on('click',function(){
//     button.eq(current_tab).removeClass('orange');
//     content.eq(current_tab).removeClass('show');
//     button.eq(1).addClass('orange');
//     content.eq(1).addClass('show');
//     current_tab = 1;
// });
// button.eq(2).on('click',function(){
//     button.eq(current_tab).removeClass('orange');
//     content.eq(current_tab).removeClass('show');
//     button.eq(2).addClass('orange');
//     content.eq(2).addClass('show');
//     current_tab = 2;
// });