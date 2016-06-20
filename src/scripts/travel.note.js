$(document).ready(function() {
  // 编辑按钮
  $('body').on('click', '.edit-btn', function(e) {
    e.preventDefault();
    var _this = $(this);
    var targetEle = _this.data('target');
    var targetVal = $(targetEle).val();
    var targetParents = $(targetEle).parents('.editor-panel');
    targetParents.addClass('editing').find('.total-words i').html(targetVal.length);
    $(targetEle).val('').focus().val(targetVal).keyup(function() {
      $(this).next('.total-words').find('i').html($(this).val().length);
    });
    $(targetEle).blur(function() {
      targetVal = $(targetEle).val();
      targetVal += '<a href="#" class="glyphicon glyphicon-pencil edit-btn" data-target="' + targetEle + '"></a>';
      targetParents.removeClass('editing').find('.show-data span').html(targetVal);
    });
  });

  // 添加段落标题、添加文字、添加图片
  $('body').on('click', '.write-tools a', function(e) {
    e.preventDefault();
    var _this = $(this);
    var role = _this.data('role');
    var targetLi = _this.data('day');
    if(role == 'title') {
      var titleNum = $('.comps-title').length ? $('.comps-title').length : 0;
      var titleHtml = '<dt>'
          + '<div class="paragraph-title">'
            + '<div class="form-group title-note">'
              + '<div class="title-panel clearfix">'
                + '<div class="editor-panel">'
                  + '<input type="text" class="form-control comps-title item-title' + titleNum + '" value="" maxlength="20" />'
                  + '<span class="total-words"><i>0</i>/20</span>'
                  + '<div class="mask-panel">'
                    + '<div class="show-data">'
                      + '<span class="paragraph-title">'
                        + '<a href="#" class="glyphicon glyphicon-pencil edit-btn" data-target=".item-title' + titleNum + '"></a>'
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
      $(titleHtml).appendTo($(targetLi).find('dl'));
      $(targetLi).find('.edit-btn').click();
    } else if(role == 'text') {
      var textHtml = '';
    } else if(role == 'image') {

    }
  });

  // 表情包
  $('body').on('click', '.face-icon', function(e) {
    e.preventDefault();
    e.stopPropagation();
    $(this).toggleClass('on').closest('.form-control').focus();
  });

  // 添加一天
  $('.add-day').click(function(e) {
    e.preventDefault();
    var curDayNum = $('.timeline-note > ul').children().length + 1;
    var addDayHtml = '<li class="day' + curDayNum + '">'
        + '<span class="day-num">DAY' + curDayNum + '</span>'
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
  });
});