$(document).ready(function() {
  // 游记标题字数计算
  // $('.note-title').keyup(function() {
  //   debugger
  //   $(this).next('.total-words').find('i').html($(this).val().length);
  // });
  $('body').on('keyup', '.note-title', function() {
    $(this).next('.total-words').find('i').html($(this).val().length);
  });

  // 添加标签
  // var tagsAddTotal = [];
  var Tags = (function() {

    // Wrapper and Input vars
    var tagsContainer,
    tagsInput,
    removeBtn = {},
    // value
    val,

    // keyboard
    KEYS = {
      ENTER: 13,
      TAB: 9,
      SPACEBAR: 32,
      BACK: 8
    },

    // Focus event through settimeout
    timer,

    // Tags array
    tagsArray = {},

    // globalEvents
    // handlerClick,
    handlerKey = [],
    handlerClick = [],

    // HTML wrapper
    html = '<input class="tag-input" maxlength="7"></input>';


    function init(selector, options) {
      if(selector.trim() === '') return;

      [].forEach.call( qsa(selector), function(originInput, index) {

        removeBtn[index] = originInput.getAttribute('data-removeBtn');

        // create and add wrapper
        var wrap = create('div', {
          'className': 'tags-container',
          'innerHTML': html
        });
      
        var placeholder = originInput.getAttribute('placeholder');
        if(placeholder)
          wrap.querySelector('input').setAttribute('placeholder', placeholder);

        originInput.style.display = 'none';
        tagsArray[index] = [];

        originInput.parentNode.insertBefore(wrap, originInput.nextSibling);

        // if input exist values by default
        if(originInput.value !== '') {
          notEmpty(originInput, index);
        }

        bindEventKey(wrap, originInput, index);
        removeBtn[index] && removeByClick(wrap, originInput, index);
      });
    }

    function bindEventKey(wrap, originInput, index) {
      judgeTagsNum();
      handlerKey[index] = function(evt) {
        if(evt.target.tagName === 'INPUT' && evt.target.className === 'tag-input') {
          tagsInput = evt.target;
          tagsContainer = tagsInput.parentNode;
          var code = evt.keyCode;
          val = tagsInput.value.trim();

          if(code === KEYS.ENTER || code === KEYS.TAB || code === KEYS.SPACEBAR) {
            evt.target.blur();
            if(code === KEYS.TAB || code === KEYS.SPACEBAR) evt.preventDefault();
            addTag(originInput, index);
            judgeTagsNum();
            if(timer) clearTimeout(timer);
            timer = setTimeout(function() { evt.target.focus(); }, 10 );
          }
          else if(code === KEYS.BACK) {
            removeTag(originInput, index);
          }
        }
      };
      wrap.addEventListener('keydown', handlerKey[index], false);
    }

    function removeByClick(wrap, originInput, index) {
        handlerClick[index] = function(evt) {
          if(evt.target.className === 'remove-tag') {
            var container = evt.target.parentNode.parentNode,
                input     = container.querySelector('input'),
                name      = evt.target.parentNode.getAttribute('data-tag');

            $('.customize-checkbox .checkbox-inline input').prop('disabled', false);
            $(input).prop('disabled', false);
            $('.customize-checkbox .checkbox-inline input').each(function() {
              var val = $(this).next().html();
              if(val === name) {
                $(this).prop('checked', false).removeClass('checked');
              }
            });
            container.removeChild(evt.target.parentNode);

            tagsArray[index].splice( tagsArray[index].indexOf(name), 1);
            originInput.value = tagsArray[index].join(',');

            input.focus();
          }
        };
        wrap.addEventListener('click', handlerClick[index], false);
    }

    function notEmpty(originInput, index) {
      var arr = originInput.value.split(',');
      var frag = document.createDocumentFragment();
      arr.forEach(function(item) {
        var tag = createTag(item, index);
        tagsArray[index].push(item);
        frag.appendChild(tag);
        $('.customize-checkbox .checkbox-inline input').each(function() {
          var _val = $(this).next().html();
          if(_val === item) {
            $(this).prop('checked', true).addClass('checked');
          }
        });
      });
      originInput.nextSibling.appendChild(frag, originInput.nextSibling.querySelector('input'));
    }

    function createTag(item, index) {
      var tag = create('div', {
        'className': 'tag',
        'textContent': item
      });
      if(removeBtn[index]) {
        addClass('tag-padding-btn', tag);
        tag.setAttribute('data-tag', item);
        tag.setAttribute('data-code', 10000);
        tag.innerHTML += '<span class="remove-tag"> &times;</span>';
      }
      return tag;
    }

    function addTag(originInput, index) {
      // delete comma if comma exists
      val = val.replace(/,/g, '').trim();

      if(val === '') return tagsInput.value = '';
      if(tagsArray[index].indexOf(val) > -1) {

        var exist = null;

        exist = qsa('.tag', tagsContainer);
        [].forEach.call(exist, function(tag) {
          if(tag.firstChild.textContent === val) {

            addClass('exist', tag);
            setTimeout(function() {
              removeClass('exist', tag);
            }, 150);
          }
        });

        return tagsInput.value = '';
      }
      var tag = createTag(val, index);
      tagsInput.parentNode.appendChild(tag, tagsInput);
      tagsArray[index].push(val);
      $('.customize-checkbox .checkbox-inline input').each(function() {
        var _val = $(this).next().html();
        if(_val === val) {
          $(this).prop('checked', true).addClass('checked');
        }
      });
      tagsInput.value = '';
      originInput.value += (originInput.value === '') ? val : ',' + val;
    }

    function removeTag(originInput, index) {
      if(val !== '' || tagsArray[index].length === 0) return;
      var name = tagsArray[index].pop();

      if(tagsInput.previousSibling) {
        tagsContainer.removeChild(tagsInput.previousSibling);
      }

      originInput.value = tagsArray[index].join(',');
    }

    // Destroy
    function destroy() {
      var tagsContainer = qsa('.tags-container');
      [].forEach.call(tagsContainer, function(container, index) {
        container.removeEventListener('keydown', handlerKey[index], false);
        removeBtn && container.removeEventListener('click', handlerClick[index], false);
        container.previousSibling.removeAttribute('style');
        container.parentNode.removeChild(container);
      });
    }

    // Helpers
    function create(el, attr) {
      var element = document.createElement(el);
      if(attr) {
        for(var name in attr) {
          if(element[name] !== undefined) {
            element[name] = attr[name];
          }
        }
      }
      return element;
    }

    function whichTransitionEnd() {
      var root = document.documentElement;
      var transitions = {
        'transition'       : 'transitionend',
        'WebkitTransition' : 'webkitTransitionEnd',
        'MozTransition'    : 'mozTransitionEnd',
        'OTransition'      : 'oTransitionEnd otransitionend'
      };

      for(var t in transitions){
        if(root.style[t] !== undefined){
          return transitions[t];
        }
      }
      return false;
    }

    function qsa(selector, context) {
      return ((context) ? context : document).querySelectorAll(selector);
    }

    if(Element.prototype.addEventListener) {
      Element.prototype.oneEventListener = function(type, cb) {

        var self = this;

        var handler = function(e) {
          self.removeEventListener(e.type, handler, false);
          cb.bind(self, e).call();
        };
        self.addEventListener(type, handler, false);
      };
    }

    // class helpers
    function hasClass(cls, el) {
      return new RegExp('(^|\\s+)' + cls + '(\\s+|$)').test(el.className);
    }
    function addClass(cls, el) {
      if( ! hasClass(cls, el) )
        return el.className += (el.className === '') ? cls : ' ' + cls;
    }
    function removeClass(cls, el) {
      el.className = el.className.replace(new RegExp('(^|\\s+)' + cls + '(\\s+|$)'), '');
    }
    function toggleClass(cls, el) {
      ( ! hasClass(cls, el)) ? addClass(cls, el) : removeClass(cls, el);
    }

    function judgeTagsNum() {
      if($('.tag-padding-btn').length >= 4) {
        $('.customize-checkbox input').not('.checked').prop('disabled', true);
        $('.tag-input').prop('disabled', true);
      } 
    }

    function resetInput() {
      $('.tag-input').prop('disabled', false).focus();
      $('.customize-checkbox input').prop('disabled', false);
    }

    function recommentTags() {
      $('.customize-checkbox input').change(function() {
        var _curTarget = $(this);
        _curTarget.toggleClass('checked');
        if(_curTarget.is(':checked')) {
          var val = _curTarget.val();
          var tagsCode = _curTarget.data('code');
          if($.inArray(val, tagsArray[0]) != -1) return;
          var tagsTemplate = '<div class="tag tag-padding-btn" data-tag="' + val + '" data-code="' + tagsCode + '">' + val + '<span class="remove-tag"> ×</span></div>'
          $('.tags-container').append(tagsTemplate);
          tagsArray[0].push(val);
          judgeTagsNum();
        } else {
          resetInput();
          var targetItem = _curTarget.next().html();
          $('.tag-padding-btn').each(function() {
            if(_curTarget.data('tag') === targetItem) {
              _curTarget.remove();
            }
          });
          $.each(tagsArray[0], function(i, val) {
            if(val === targetItem) {
              tagsArray[0].splice(i, 1);
            }
          });
        }
      });
    }

    return {
      init: init,
      destroy: destroy,
      recommentTags: recommentTags
    };
  })();

  // 存储添加的标签
  var btnAddTagCur;
  addTagsModal();
  // 添加标签弹窗
  function addTagsModal(modalShowFn, modalHideFn) {
    $('body').on('click', '.btn-add-tags', function(e) {
      e.preventDefault();
      var recommentTagsHtml = '';
      $.each(TRAVEL_CONFIG.TAGS, function(i, val) {
        recommentTagsHtml += '<label class="checkbox-inline">'
              + '<input type="checkbox" value="' + val.text + '" data-code="' + val.code + '">'
              + '<span>' + val.text + '</span>'
            + '</label>';
      });
      var addTagsModal = '<form action="">'
          + '<div class="form-group">'
            + '<label for="add-tags-input">标签 <span>(最多4个标签，每个标签最多7个字)</span></label>'
            + '<input type="text" id="default" class="tagged form-control" name="tag-1" data-removeBtn="true" placeholder="空格确认标签" value="' + $(this).data('value') + '" />'
          + '</div>'
          + '<div class="form-group customize-checkbox">'
            + '<span>常用标签：</span>'
            + recommentTagsHtml
          + '</div>'
          + '<a href="#" class="form-btn add-tags-completed">完成</a>'
        + '</form>';
      btnAddTagCur = $(this);
      $(addTagsModal).appendTo($('.modal-body'));
      $('.customize-modal').modal('show')
      .on('shown.bs.modal', function() {
        if($('.customize-modal .tags-container').length) return;
        Tags.init('.tagged');
        addTagCompleteBtn(btnAddTagCur);
      })
      .on('hidden.bs.modal', function() {
        Tags.destroy();
        $('.customize-modal .modal-body').empty();
      });
      Tags.recommentTags();
    });
  }

  // 添加标签-完成按钮
  function addTagCompleteBtn(obj) {
    $('.add-tags-completed').click(function(e) {
      e.preventDefault();
      var tagsHtml = '';
      var tagComplete = [];
      $('.tag-padding-btn').each(function() {
        var _tag = $(this).data('tag');
        var tagsCode = $(this).data('code');
        tagsHtml += '<span data-code="' + tagsCode + '" data-tag="' + _tag + '">' + _tag + '</span>';
        tagComplete.push(_tag);
      });
      obj.data('value', tagComplete.join(',')).parent().prev().html(tagsHtml);
      $('.customize-modal').modal('hide');
    });
  }
  
  // 出行时间选择器
  $('.datepicker-options').datepicker({
    maxDate: new Date(),
    onSelect: function(formattedDate, date, inst) {
      if($('.datepicker-panel').length) {
        $('.datepicker-panel b').html(formattedDate);
      }
    }
  });
  // 人均费用美化插件
  $('.travel-cost').select2({
    placeholder: '请选择',
    minimumResultsForSearch: Infinity
  })
  .change(function() {
    $('.travel-cost-box > b').html($(this).val());
  });

  
  var setOffArea = {
    "message": "查询成功",
    "result": {
      "result": [
        {
          "city": "北京市",
          "cityid": "",
          "distinct": "东城区",
          "location": "39.915124,116.404033",
          "name": "天安门",
          "uid": "65e1ee886c885190f60e77ff"
        },
        {
          "city": "北京市",
          "cityid": "",
          "distinct": "东城区",
          "location": "39.912594,116.404043",
          "name": "天安门广场",
          "uid": "c9b5fb91d49345bc5d0d0262"
        },
        {
          "city": "北京市",
          "cityid": "",
          "distinct": "东城区",
          "location": "39.91408,116.407851",
          "name": "天安门东-地铁站",
          "uid": "940aeb3c98d5a0218a2fb5de"
        },
        {
          "city": "北京市",
          "cityid": "",
          "distinct": "东城区",
          "location": "39.913279,116.40393",
          "name": "天安门广场-国旗",
          "uid": "4ae2adcf574bcd2b38221c66"
        },
        {
          "city": "北京市",
          "cityid": "",
          "distinct": "东城区",
          "location": "39.907253,116.405886",
          "name": "天安门广场-入口",
          "uid": "9711b16c49ec39e78605bfb4"
        },
        {
          "city": "北京市",
          "cityid": "",
          "distinct": "东城区",
          "location": "39.924455,116.403438",
          "name": "故宫博物院",
          "uid": "06d2dffda107b0ef89f15db6"
        },
        {
          "city": "北京市",
          "cityid": "",
          "distinct": "东城区",
          "location": "39.917956,116.409734",
          "name": "汉庭酒店(北京天安门店)",
          "uid": "14c29dfa2b61be2959bbbc7b"
        },
        {
          "city": "北京市",
          "cityid": "",
          "distinct": "东城区",
          "location": "39.905041,116.408372",
          "name": "锦江之星酒店(北京前门店)",
          "uid": "cde9e2c7aa24b6ade81e9738"
        },
        {
          "city": "北京市",
          "cityid": "",
          "distinct": "西城区",
          "location": "39.902355,116.40266",
          "name": "海友酒店(北京前门店)",
          "uid": "89fd4ea323f40d5ee4e965f6"
        },
        {
          "city": "北京市",
          "cityid": "",
          "distinct": "西城区",
          "location": "39.899197,116.404052",
          "name": "速8酒店(北京前门店)",
          "uid": "0fe97227b9d4e766902ca357"
        }
      ]
    }
  }

  var availableTags = [];
  $.each(setOffArea.result.result, function(i, val) {
    availableTags.push(val.city + val.distinct + val.name);
  });
  // var availableTags = [
  //   "ActionScript",
  //   "AppleScript",
  //   "Asp",
  //   "BASIC",
  //   'AAA',
  //   'abs',
  //   "C",
  //   "C++",
  //   "Clojure",
  //   "COBOL",
  //   "ColdFusion",
  //   "Erlang",
  //   "Fortran",
  //   "Groovy",
  //   "Haskell",
  //   "Java",
  //   "JavaScript",
  //   "Lisp",
  //   "Perl",
  //   "PHP",
  //   "Python",
  //   "Ruby",
  //   "Scala",
  //   "Scheme"
  // ];

  // 出发地
  var cache = {};
  $('#address').autocomplete({
    // ajax请求
    // source: function(request, response ) {
    //   var term = request.term;
    //   if ( term in cache ) {
    //     response( $.map( cache[ term ], function( item ) {
    //       return {
    //         city: item.city,
    //         cityid: item.cityid,
    //         distinct: item.distinct,
    //         location: item.location,
    //         name: item.name,
    //         uid: item.uid
    //       }
    //     }));
    //     return;
    //   }
    //   $.ajax({
    //     url: 'http://10.169.48.47:8080/commonexternal/getsuggestplace.do',
    //     dataType: "json",
    //     data:{
    //       query: request.term
    //     },
    //     success: function( data ) {
    //       cache[ term ] = data;
    //       response( $.map( data, function( item ) {
    //           return {
    //             city: item.city,
    //             cityid: item.cityid,
    //             distinct: item.distinct,
    //             location: item.location,
    //             name: item.name,
    //             uid: item.uid
    //           }
    //       }));
    //     }
    //   });
    // },
    // 固定数据
    source: availableTags,
    minLength: 1,
    max: 5,
    formatItem: function(item) {
      return item.city + item.distinct + item.name;
    }
  })
  // 设置封面
  uploadFile();
  

  // 表情弹窗
  $('.js_face').find('a').click(function () {
    var strFace = $(this).attr("title");
    strFace = '[' + strFace + ']';
    var _c = $('div.js_main_box');
    var $currentTextarea = _c.find(".js_textarea[data-flag]");
    if ($currentTextarea.size() == 0)
      $currentTextarea = _c.find(".js_textarea:last");
    if ($currentTextarea.val() == $currentTextarea.data("placeholder")) {
      $currentTextarea.val("");
    }
    $('#popFace').addClass('fn-hide');
    insertText($currentTextarea.get(0), strFace);
    $currentTextarea.addClass("form-textarea-visited");
  });



  // 点击下一步
  $('.next-step').click(function(e) {
    e.preventDefault();
    var jsonData = {
      id: 0,
      createType: 'pc',
      userId: 28188388,
      userName: 'Guoquan_sky',
      userPic: 'http://x.autoimg.cn/space/images/head_120X120.gif', 
      coverInfo: {}
    };
    var formError = [];
    $('.required').each(function() {
      var _this = $(this);
      var formName = _this.attr('name');
      var formVal = _this.val();
      var errorMes = _this.data('error');
      if(!formVal) {
        formError.push(errorMes);
        if(formError.length === 1) {
          _this.addClass('error-focus');
        }
      }
      if(!formError.length) {
        jsonData.coverInfo[formName] = formVal;
      }
    });
    // 标签
    var tagsItem = $('.tags-box').children();
    var tagsData = {};
    if(tagsItem.length) {
      jsonData.tagdict = [];
      $.each(tagsItem, function() {
        var _this = $(this);
        tagsData = {
          code: _this.data('code'),
          text: _this.data('tag')
        }
        jsonData.tagdict.push(tagsData);
      });
    }
    if(formError.length) {
      var modalFormError = '<p>' + '请正确输入' + formError.join('、') + '！' + '</p>'
      modalShow(modalFormError, 'form-error-modal', function() {
      }, function() {
        $('.error-focus').focus();
      });
    } else {
      if(window.sessionStorage) {
        sessionStorage.setItem('jsonData', JSON.stringify(jsonData));
        window.location.href = '/templates/travel.note.html'
      }
    }
    
  });
});