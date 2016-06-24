$(document).ready(function() {
  // 渲染封面的配置
  var coverConfig = JSON.parse(sessionStorage.getItem("jsonData"));
  console.log(coverConfig);
  // 输出文章标题
  $('.cover-title input').val(coverConfig.coverInfo.title);
  $('.cover-title .show-data span').html(coverConfig.coverInfo.title + '<a href="#" class="glyphicon glyphicon-pencil edit-btn" data-target=".note-title"></a>');
  $('.cover-title .total-words i').text(coverConfig.coverInfo.title.length);

  // 输出标签
  var tagdict = [];
  var coverTagsHtml = '';
  $.each(coverConfig.coverInfo.tagdict, function(i, val) {
    coverTagsHtml += '<span data-code="' + val.code + '" data-tag="' + val.text + '">' + val.text + '</span>';
    tagdict.push(val.text);
  });
  tagdict = tagdict.join(',');
  $('.cover-tagdict .tags-box').html(coverTagsHtml);
  $('.cover-tagdict .btn-add-tags').data('value', tagdict);

  // 出行时间
  $('.cover-startTime').val(coverConfig.coverInfo.startTime);

  // 出发地
  $('.cover-destination input').val(coverConfig.coverInfo.destination);
  $('.cover-destination .address-span').val(coverConfig.coverInfo.destination);

  // 人均费用
  $('.cover-percost').val(coverConfig.coverInfo.perCost);



  // 编辑按钮
  $('body').on('click', '.edit-btn', function(e) {
    e.preventDefault();
    var _this = $(this);
    var targetEle = _this.data('target');
    var targetRole = _this.data('role');
    var targetNode = _this.data('node');
    var targetVal = $(targetEle).val();
    var targetParents = $(targetEle).parents('.editor-panel');
    var qqFaceEle = targetParents.find('.qq-face');
    var curDtIndex;
    targetParents.addClass('editing');
    if(targetParents.find('.total-words').length) {
      targetParents.find('.total-words i').html(targetVal.length);
    }
    $(targetEle).val('').focus().val(targetVal).keyup(function() {
      $(this).next('.total-words').find('i').html($(this).val().length);
    });

    if(qqFaceEle.length) {
      qqFaceEle.addClass('facing');
    }
    $(targetEle).blur(function() {
      // 判断是否是表情包
      if(qqFaceEle.is('.facing')) return;
      targetVal = $(targetEle).val();
      targetVal += '<a href="#" class="glyphicon glyphicon-pencil edit-btn" data-target="' + targetEle + '" data-role="' + targetRole + '" data-node="' + targetNode + '"></a>';
      targetVal = targetVal.replace(/(\[([\s\S]+?)\])/g, function(s, $1, name) {
        var faceImg = '';
        $.each(TRAVEL_CONFIG.QQ_FACE, function(i, val) {
          if(val.name === s) {
            faceImg = '<img src="' + val.url + '" alt="' + name + '">'
          }
        });
        return faceImg;
      });
      targetParents.removeClass('editing').find('.show-data span').html(targetVal);
      curDtIndex = $(targetNode).find('dt').index($(this).parents('dt'));
      if(targetRole === 'title') {
        htmldir($(targetEle).val(), 'level2', targetNode, curDtIndex);
      }
    });
  });

  // 生成目录
  function htmldir(titleCon, type, targetEle, curDtIndex) {
    var chapterHtml = '';
    $('.item-txt, .item-tit').removeClass('active');
    if($('.chapter-box').find(targetEle).children().length > curDtIndex + 1) {
      $('.chapter-box').find(targetEle).children().eq(curDtIndex + 1).html('<p class="item-txt active"><i>-----</i>' + titleCon + '</p>');
      return;
    }
    if(type === 'level1') {
      chapterHtml = '<li class="' + titleCon.toLowerCase() + '"><p class="item-tit active">' + titleCon + '</p></li>';
    } else if(type === 'level2') {
      chapterHtml = '<p class="item-txt active"><i>-----</i>' + titleCon + '</p>';
    }
    $('.chapter-box').find(targetEle).append(chapterHtml);
  }

  // 获取qq表情包
  var qqFacePackage = getFaceHtml();
  function getFaceHtml() {
    var html = '';
    var qqFaceItem = '';
    $.each(TRAVEL_CONFIG.QQ_FACE, function(i, val) {
      qqFaceItem += '<li>'
        + '<a href="javascript:void(0);" title="' + val.name + '">'
          + '<img src="' + val.url + '">'
        + '</a>'
      + '</li>'; 
    });
    html = '<ul>' + qqFaceItem + '</ul>';
    return html;
  }

  // 添加段落标题、添加文字、添加图片
  $('body').on('click', '.write-tools a', function(e) {
    e.preventDefault();
    var _this = $(this);
    var role = _this.data('role');
    var targetLi = _this.data('day');
    var dayNum = targetLi.substr(('.day').length);
    if(role == 'title') {
      var titleEleLen = $(targetLi).find('.comps-title').length;
      var titleNum = titleEleLen ? titleEleLen : 0;
      var titleHtml = '<dt>'
          + '<div class="paragraph-title">'
            + '<div class="form-group title-note">'
              + '<div class="title-panel clearfix">'
                + '<div class="editor-panel">'
                  + '<input type="text" class="form-control comps-title item-title' + dayNum + '-' + titleNum + '" value="" maxlength="20" />'
                  + '<span class="total-words"><i>0</i>/20</span>'
                  + '<div class="mask-panel">'
                    + '<div class="show-data">'
                      + '<span class="paragraph-title">'
                        + '<a href="#" class="glyphicon glyphicon-pencil edit-btn" data-target=".item-title' + dayNum + '-' + titleNum + '" data-role="title" data-node="' + targetLi + '"></a>'
                      + '</span>'
                    + '</div>'
                  + '</div>'
                + '</div>'
              + '</div>'
            + '</div>'
            + '<div class="form-group edit-add-tags clearfix">'
              + '<div class="tags-box"></div>'
              + '<div class="add-tags">'
                + '<a href="javascript:;" class="btn-add-tags" data-value="">添加标签</a>'
              + '</div>'
            + '</div>'
          + '</div>'
        '</dt>';
      $(titleHtml).appendTo($(targetLi).find('dl')).find('.edit-btn').click();
    } else if(role == 'text') {
      var paragraphConLen = $(targetLi).find('.paragraph-con').length;
      var textNum = paragraphConLen ? paragraphConLen : 0;
      var textHtml = '<dd>'
          + '<div class="paragraph clearfix">'
            + '<div class="form-group editor-panel paragraph-inner">'
              + '<textarea class="form-control paragraph-con paragraph-con' + dayNum + '-' + paragraphConLen + '" rows="5" placeholder="请添加游记文字"></textarea>'
              + '<div class="mask-panel">'
                + '<div class="show-data">'
                  + '<span class="paragraph-main">'
                    + '<a href="#" class="glyphicon glyphicon-pencil edit-btn" data-target=".paragraph-con' + dayNum + '-' + paragraphConLen + '"></a>'
                  + '</span>'
                + '</div>'
              + '</div>'
              + '<div class="btn-groups clearfix">'
                + '<div class="qq-face" data-target=".paragraph-con' + dayNum + '-' + paragraphConLen + '">'
                  + '<a href="#" class="face-icon">'
                  + '</a>'
                  + '<div id="popFace" class="pop pop01 pop-bottom fn-hide">'
                    + '<div class="pop-content">'
                      + '<div class="pop-content-info pop_expre js_face">'
                        + qqFacePackage
                      + '</div>'
                    + '</div>'
                  + '</div>'
                + '</div>'
                + '<a href="#" class="form-btn" data-target=".paragraph-con' + dayNum + '-' + paragraphConLen + '">完成</a>'
              + '</div>'
            + '</div>'
          + '</div>'
        + '</dd>';
      $(textHtml).appendTo($(targetLi).find('dl')).find('.edit-btn').click();
    } else if(role == 'image') {

    }
  });

  // 添加文字-完成
  $('body').on('click', '.paragraph-inner.editing .form-btn', function(e) {
    e.preventDefault();
    $(this).prev().removeClass('facing');
    $($(this).data('target')).blur();
  });

  // 表情包
  $('body').on('click', '.face-icon', function(e) {
    e.preventDefault();
    e.stopPropagation();
    $(this).toggleClass('on').closest('.form-control').focus();
  });

  // 选择表情
  $('body').on('click', '.js_face a', function() {
    var targetTextarea = $(this).parents('.qq-face').data('target');
    var textareaVal = $(targetTextarea).val();
    textareaVal ? $(targetTextarea).val($(targetTextarea).val() + $(this).attr('title')) : $(targetTextarea).val($(this).attr('title'));
  });


  // 添加一天
  $('.add-day').click(function(e) {
    e.preventDefault();
    var curDayNum = $('.timeline-note > ul').children().length + 1;
    var addDayHtml = '<li class="day' + curDayNum + '">'
        + '<div class="day-tools">'
          + '<span class="day-num">DAY' + curDayNum + '</span>'
            + '<a href="#" class="glyphicon glyphicon-remove-sign"></a>'
              + '</div>'
        + '<div class="write-tools">'
          + '<a href="#" data-role="title" data-day=".day' + curDayNum + '">'
            + '<i></i>'
            + '<span>添加段落标题</span>'
          + '</a>'
          + '<a href="#" data-role="text" data-day=".day' + curDayNum + '">'
            +'<i></i>'
            + '<span>添加文字</span>'
          + '</a>'
          + '<a href="#" data-role="image" data-day=".day' + curDayNum + '">'
            + '<i></i>'
            + '<span>添加图片</span>'
          + '</a>'
        + '</div>' 
        + '<dl></dl>'
      + '</li>';
    $(addDayHtml).appendTo($('.timeline-note > ul'));
    htmldir('DAY' + curDayNum, 'level1', '.menu');
  });
});