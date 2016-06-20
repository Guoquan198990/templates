$(document).ready(function() {
  // 上传头图
  uploadFile(function(src) {
    $('.banner').css('background-image', 'url("' + src + '")');
  });

  overageWords('.travel-title input');

  addTags();

  

  // 计算标题剩余字数
  function overageWords(obj) {
    var inputEle = $(obj);
    var enterLen = inputEle.val().length;
    var maxLen = inputEle.attr('maxlength');
    var target = $('.' + inputEle.data('target'));
    var overageLen = maxLen - enterLen;

    inputEle.keyup(function() {
      enterLen = inputEle.val().length;
      overageLen = maxLen - enterLen;
      if(enterLen >= 18) {
        overageLen = 0;
      }
      target.html(overageLen);
    });
  }

  function addTags() {
    $('.btn-add-tags').click(function(e) {
      e.preventDefault();
      $('.customize-modal').modal('show')
      .on('shown.bs.modal', function() {
        $('#add-tags-input').select2({
          placeholder: "空格确认标签",
          maximumSelectionLength: 4,
          tags: true,
          tokenSeparators: [" "]
        }).on('change', function(e) {
          // $('.js-event-log').html($('.select2-selection__rendered').html());
          // $('.select2-selection__rendered').html().appendTo($('.js-event-log'));
        });
      });
    });
  }

  // function log (name, evt) {
  //   if (!evt) {
  //     var args = "{}";
  //   } else {
  //     var args = JSON.stringify(evt.params, function (key, value) {
  //       if (value && value.nodeName) return "[DOM node]";
  //       if (value instanceof $.Event) return "[$.Event]";
  //       return value;
  //     });
  //   }
  //   var $e = $("<li>" + name + " -> " + args + "</li>");
  //   $('.js-event-log').append($e);
  // }
  
  $('.tools-status').click(function() {
    $('.edit-tools').toggleClass('open');
  });

  // 文章排序
  $('.travel-wrapper').gridly({
    callbacks: {
      // reordering: function($elements) {
      //   $('.dragging').addClass('active');
      // },
      // reordered: function($elements) {
      //   $('.brick').removeClass('active');
      // }
    }
  });

  var targetEle = $('.travel-route').children();
  var brick = targetEle.children();
  $(document).on('click touchend', '.travel-wrapper > .brick', function(e) {
    e.preventDefault();
    e.stopPropagation();
    var _this = $(this);
    $('.customize-modal')
      .find('.modal-body').html(_this.find('.travel-day-details').html()).end()
      .modal('show')
      .on('shown.bs.modal', function() {
        $('.customize-modal').find('.day-details').gridly();
      })
      .on('hidden.bs.modal', function() {
        _this.removeClass('active');
        $('.customize-modal').find('.modal-body').html('');
      });
    _this.toggleClass('active');
    return $('.travel-wrapper').gridly('layout');
  });

  
  $(document).on('click', '.delete', function(e) {
    e.preventDefault();
    e.stopPropagation();
    var _this = $(this);
    _this.closest('li').remove();
    return $('.travel-wrapper').gridly('layout');
  });





//   // $(document).on('click', '.add', function(e) {
//   //   e.preventDefault();
//   //   e.stopPropagation();
//   //   targetEle.append('aa');
//   //   return $('.gridly').gridly();
//   // });
//   return $('.gridly').gridly();
// });

 
});






















