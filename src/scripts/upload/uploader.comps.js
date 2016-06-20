$('body').on('click', '.close-modal', function(e) {
  e.preventDefault();
  $('.customize-modal').modal('hide');
});

function modalShow(template, customizeClass, shownFn, hideFn) {
  $(template).appendTo($('.modal-body'));
  $('.customize-modal').addClass(customizeClass).modal('show')
  .on('shown.bs.modal', function() {
    shownFn && shownFn();
  })
  .on('hidden.bs.modal', function() {
    $('.customize-modal').removeClass(customizeClass).find('.modal-body').empty();
    hideFn && hideFn();
  });
}

//上传头图
function uploadFile(fn) {
  var sizeSmallError = '<div class="error-panel error-size-small">'
        + '<img src="../images/interrobang.png" alt=""/>'
        + '<p>封面图片最小尺寸为990x330</p>'
        + '<p>请重新选择封面图片</p>'
        + '<div class="btn-panel"><a href="#" class="form-btn close-modal">确定</a></div>'
      + '</div>';
  var sizeLargeError = '<div class="error-panel error-size-large">'
        + '<img src="../images/interrobang.png" alt=""/>'
        + '<p>封面图片最大尺寸为9999x9999，最大不超过20MB</p>'
        + '<p>请重新选择封面图片</p>'
        + '<div class="btn-panel"><a href="#" class="form-btn close-modal">确定</a></div>'
      + '</div>';
  var uploadFail = '<div class="error-panel error-upload-fail">'
        + '<img src="../images/upload_fail.png" alt=""/>'
        + '<p>上传图片失败了，是否重新上传</p>'
        + '<div class="btn-panel"><a href="#" class="form-btn close-modal">确定</a></div>'
      + '</div>';
  var uploadProgress ='<div class="progress">'
        + '<div class="progress-bar progress-bar-success progress-bar-striped">'
        + '</div>'
      + '</div>';
  $('.input-upload input').fileupload({
    url: '/',
    sequentialUploads: true,
    xhrFields: {
        withCredentials: true
    }
  }).bind('fileuploadadd', function(e, data) {
    // 上传的头图宽度不得小于720
    var reader = new FileReader();
    var uploadStatus = data.submit();
    reader.readAsDataURL(data.files[0]);
    reader.data = data;
    reader.file = data.files[0];
    reader.onload = function(_file) {
      var image = new Image();
      image.src = _file.target.result;              
      image.file = this.file;
      image.data = this.data;
      image.onload = function () {
        var w = this.width,
            h = this.height,
            n = this.file.name;
        if ( w < 990 || h < 330) {
            modalShow(sizeSmallError, 'error-modal');
            uploadStatus.abort();
            return false;
        }

        if(parseFloat(image.file.size / 1024).toFixed(2) > (20 * 1024) || w > 9999 || h > 9999) {
          modalShow(sizeLargeError, 'error-modal');
          uploadStatus.abort();
          return false;
        }
      }
    }
  }).bind('fileuploadstart', function(e, data) {
      
  }).bind('fileuploadprogress', function(e, data) {
    modalShow(uploadProgress, 'upload-progress-modal');
    var progress = parseInt(data.loaded / data.total * 100, 10);
    $('.progress-bar-success').css('width', progress + '%');
  }).bind('fileuploaddone', function(e, data) {
    $('.upload-progress-modal').modal('hide');
    setTimeout(function() {
      cropImage(image.src);
      $('.input-upload input').val('');
    }, 500);
  }).bind('fileuploadfail', function(e, data) {
    alert(0);
    // $('.upload-progress-modal').modal('hide');
    // setTimeout(function() {
    //   modalShow(uploadFail, 'error-modal');
    // }, 500);
  });
}

function tooltips() {
  $('[data-toggle="tooltip"]').tooltip();
}

function isImageFile(file) {
  if (file.type) {
    return /^image\/\w+$/.test(file.type);
  } else {
    return /\.(jpg|jpeg|png|gif)$/.test(file);
  }
}

function cropImage(src) {
  var cropHtml = '<div class="avatar-body">'
      + '<div class="avatar-wrapper">'
        + '<img src="" alt="" />'
      + '</div>'
    + '</div>';
  var cropBtns = '<div class="form-groups crop-btns">'
      + '<button type="button" class="btn btn-cancel close-modal">取消</button>'
      + '<button type="button" class="btn btn-complete">确定</button>'
    + '</div>';
  var cropSize = '<div class="crop-size">'
        + '<span class="crop-width">300</span>'
        + ' X '
        + '<span class="crop-height">300</span>'
      + '</div>';
  // $(cropHtml).appendTo($('.customize-modal .modal-body'));
  // $('.customize-modal').addClass('crop-modal').modal('show')
  // .on('hidden.bs.modal', function() {
  //   $('.customize-modal').removeClass('crop-modal').find('.modal-body').empty();
  // });

  modalShow(cropHtml, 'crop-modal');
  // modalShow(cropHtml, function() {
  //   // $('.customize-modal').addClass('crop-modal');
  // }, function() {
  //   $('.customize-modal').removeClass('crop-modal').find('.modal-body').empty();
  // });
  $('.avatar-wrapper img').attr('src', src);
  // $('.crop-modal').modal('show');

  // 裁剪图片
  var $image = $('.avatar-wrapper img');
  var options = {
    aspectRatio: 3 / 1,
    background: false,
    guides: false,
    zoomable: false,
    mouseWheelZoom: false,
    touchDragZoom: false,
    minCropBoxWidth: 264,
    minCropBoxHeight: 88,
    // dragMode: 'none',
    // preview: '.img-preview',
    crop: function(data) {
      // console.log(data);
      // if(data.width < 990) {
      //   $image.cropper('disable');
      // }
    }
  }

  // Cropper
  $image.on({
    'built.cropper': function (e) {
      // console.log(e.type);
      if(!$('.crop-btns').length) {
        $(cropBtns).appendTo($('.cropper-crop-box'));
        $(cropSize).appendTo($('.cropper-crop-box'));
        $('.btn-complete').click(function(e) {
          e.preventDefault();
          var result= $image.cropper("getCroppedCanvas");
          var data=result.toDataURL();
          $('.cover-container').css('background-image', 'url(' + data +')').find('.customize-upload span').html('更改封面');
          $('.customize-modal').modal('hide');

        });
      }
      getCroppedSize();
    },
    'cropstart.cropper': function (e) {
      // console.log(e.type, e.action);
    },
    'cropmove.cropper': function (e) {
      // console.log(e.type, e.action);
    },
    'cropend.cropper': function (e) {
      // console.log(e.type, e.action);
    },
    'crop.cropper': function (e) {
      // console.log(e.width, e.height);
      // console.log(e.type, e.x, e.y, e.width, e.height, e.rotate, e.scaleX, e.scaleY);
    },
    'zoom.cropper': function (e) {
      // console.log(e.type, e.ratio);
    }
  }).cropper(options);

  $image.on('dragmove.cropper', function (e) {
    getCroppedSize();
  });

  function getCroppedSize() {
    var data = $image.cropper('getCroppedCanvas');
    $('.crop-width').html(parseInt(data.width));
    $('.crop-height').html(parseInt(data.height));
  }


  // $('.img-editor-btns').on('click', '[data-method]', function() {
  //   var $this = $(this);
  //   var data = $this.data();
  //   var $target;
  //   var result;
  //   if($this.prop('disabled') || $this.hasClass('disabled')) {
  //     return;
  //   }

  //   if($image.data('cropper') && data.method) {
  //     data = $.extend({}, data);

  //     if(typeof data.target !== 'undefined') {
  //       try {
  //         data.opation = JSON.parse($target.val());
  //       } catch(e) {
  //         console.log(e.message);
  //       }
  //     }

  //     result = $image.cropper(data.method, data.option, data.secondOption);

  //     switch(data.method) {
  //       case 'scaleX':
  //       case 'scaleY':
  //         $(this).data('opation', -data.option);
  //         break;
  //       case 'getCroppedCanvas':
  //         if (result) {
  //           // Bootstrap's Modal
  //           $('#getCroppedCanvasModal').modal().find('.modal-body').html(result);
  //           if (!$download.hasClass('disabled')) {
  //             $download.attr('href', result.toDataURL('image/jpeg'));
  //           }
  //         }
  //         break;
  //     }
  //     if ($.isPlainObject(result) && $target) {
  //       try {
  //         $target.val(JSON.stringify(result));
  //       } catch (e) {
  //         console.log(e.message);
  //       }
  //     }
  //   }
  // });


  // var $inputImage = $('.input-upload input');
  // var URL = window.URL || window.webkitURL;
  // var blobURL;

  // if (URL) {
  //   $inputImage.change(function () {
  //     var files = this.files;
  //     var file;

  //     if (!$image.data('cropper')) {
  //       return;
  //     }

  //     if (files && files.length) {
  //       file = files[0];

  //       if (/^image\/\w+$/.test(file.type)) {
  //         blobURL = URL.createObjectURL(file);
  //         $image.one('built.cropper', function () {

  //           // Revoke when load complete
  //           URL.revokeObjectURL(blobURL);
  //         }).cropper('reset').cropper('replace', blobURL);
  //         $inputImage.val('');
  //       } else {
  //         window.alert('Please choose an image file.');
  //       }
  //     }
  //   });
  // } else {
  //   $inputImage.prop('disabled', true).parent().addClass('disabled');
  // }
}