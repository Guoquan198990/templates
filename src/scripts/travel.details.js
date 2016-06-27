$(document).ready(function() {
  var menuBox = $('.menu-box');
  var menuInner = $('.menu-inner');
  var chapterBox = $('.chapter-box');
  var menuStatusClass = 'fixed fixed-bottom';
  var articleHeight = ~~($('.article').height() - $('.options-box').outerHeight());
  var anchorPos = [];
  var chapterItem = menuInner.find('p');
  var chapterIcon = $('.chapter-icon');
  var chapterIconH = chapterIcon.height();
  var chapterIconPos = 0;
  var customizeScrollPos = 0;
  var curChapter = [];
  var chapterBoxH = chapterBox.height();

  menuBox.height(articleHeight);

  chapterBox.mCustomScrollbar({
    axis:"y",
    autoHideScrollbar: true
  });

  // 存储目录锚点
  $.each($('.J-detail-list'), function() {
    anchorPos.push($(this).offset().top);
  });
  $(window).scroll(function() {
    var sT = $('body').scrollTop();

    // 固定目录
    if(sT >= menuBox.offset().top) {
      menuInner.removeClass(menuStatusClass).addClass('fixed');
    } else {
      menuInner.removeClass(menuStatusClass);
    }

    if(sT >= ($('.options-box').offset().top - menuInner.height())) {
      menuInner.removeClass(menuStatusClass).addClass('fixed-bottom');
    }

    // 目录联动
    $.each(anchorPos, function(i, val) {
      if(sT + 50 >= anchorPos[i]) {
        if($.inArray(i, curChapter) === -1) {
          curChapter.push(i);
        }
      } else {
        curChapter.splice(i, 1);
      }
    });
    if(!$('body').is(':animated')) {
      var curIndex = curChapter.length ? curChapter[curChapter.length - 1] : 0;
      chapterItem.removeClass('active').eq(curIndex).addClass('active');
      chapterIconPos = chapterItem.eq(curIndex).offset().top - $('.menu').offset().top + ((chapterItem.eq(curIndex).height() - chapterIconH) / 2);
      chapterIcon.css('top', chapterIconPos);

      // 目录自定义滚动条联动
      // var curChapterItem = chapterItem.filter('.active');
      // var customizeScrollPos = curChapterItem.offset().top + chapterItem.height() - chapterBox.offset().top - chapterBox.height();
      // console.log(curChapterItem.offset().top + chapterItem.height(), chapterBox.offset().top, chapterBox.height(), customizeScrollPos);
      // customizeScrollPos = customizeScrollPos < 0 ? 0 : customizeScrollPos;
      // customizeScrollPos = 0;
      // if(curChapterItem.offset().top - chapterBox.offset().top > chapterBox.height()) {
      //   customizeScrollPos = curChapterItem.offset().top - chapterBox.offset().top - chapterBox.height() + 40;
      //   console.log(222);
      // }
      // chapterBox.mCustomScrollbar('scrollTo',customizeScrollPos);
    }
  });

  // 目录锚点
  chapterItem.click(function() {
    var _this = $(this);
    var curIndex = chapterItem.index(_this);
    chapterItem.removeClass('active').eq(curIndex).addClass('active');
    $('html, body').animate({'scrollTop': anchorPos[curIndex]}, 500);
    chapterIconPos = _this.offset().top - $('.menu').offset().top + ((_this.height() - chapterIconH) / 2);
    chapterIcon.animate({'top': chapterIconPos}, 300);
  });

  // 禁止鼠标在目录区域，文章内容会随之滚动
  var inner = document.getElementById('J-inner');
  inner.onmouseenter=function(){
    preventScroll();
  }
  function preventScroll(){  
    var _this = inner;  
    if(navigator.userAgent.indexOf("Firefox")>0){  
      _this.addEventListener('DOMMouseScroll',function(e){  
        _this.scrollTop += e.detail > 0 ? 60 : -60;    
        console.log(e) 
        e.preventDefault();  
      },false);   
    } else{  
      if(_this.addEventListener){//主流浏览器  
        _this.addEventListener('mousewheel', function(e){
          e = e || window.event;     
          _this.scrollTop += e.wheelDelta > 0 ? -60 : 60;    
          e.returnValue = false; 
          return false;  
        }, false);  
      } else{//IE 
        _this.attachEvent("onmousewheel", function( e ){
          e = e || window.event;     
          _this.scrollTop += e.wheelDelta > 0 ? -60 : 60;    
          e.returnValue = false; 
          return false;  
        });     
      }  
    }  
    return this;  
  }
});