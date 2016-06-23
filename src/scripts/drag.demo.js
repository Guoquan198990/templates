$(document).ready(function() {
  $('.drag-main a').click(function(e) {
    e.preventDefault();
    $('.drag-article').addClass('open');
  });

  $('.back-btn').click(function(e) {
    e.preventDefault();
    $('.drag-article').removeClass('open');
  });


  $('.gridly').gridly({
    base: 40, // px 
    gutter: 20, // px
    columns: 12
  });
});