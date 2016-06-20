$(document).ready(function() {
  targetIconPos();

  function targetIconPos() {
    var chapterCur = $('.chapter-list a.active');
    var targetIcon = $('.target-icon');
    var targetIconPos = chapterCur.offset().top - $('.side-content').offset().top + chapterCur.height() / 2 - targetIcon.height() / 2 - $('body').scrollTop();
    targetIcon.css('top', targetIconPos);
  }
  
  $('.chapter-list a').click(function(e) {
    e.preventDefault();
    if($(this).is('.active')) return;
    $('.chapter-list a').removeClass('active');
    var $target = $(this.hash);
    var targetOffset = $target.offset().top;
    $(this).addClass('active');
    $('body').stop().animate({scrollTop: targetOffset}, 500);
    targetIconPos();
  });

  $(window).scroll(function() {
    var targetEle = [];
    $('.para-title').each(function(i, val) {
      if($(window).scrollTop() >= ($(this).offset().top - 20)) {
        var targetTit = $(this).children().attr('id');
        targetEle.push(targetTit);
        $('.chapter-list a').each(function() {
          $('.chapter-list a').removeClass('active');
          // console.log('href: ' + $(this).attr('href') + ' arr: ' + targetEle[targetEle.length - 1]);
          if($(this).attr('href') === '#' + targetEle[targetEle.length - 1]) {
            $(this).addClass('active');
            targetIconPos();
          }
        });
      }
    });
  });

});