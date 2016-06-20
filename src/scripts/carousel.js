function requireComps(templateName, target, data) {
  require(['/build/' + templateName], function (content) {
    $(target).html(content(data));
  });
}

$(document).ready(function() {
  $('.comps').each(function() {
    var _templateName = $(this).data('template');
    var _target = $(this).data('target');
    var _data = eval('(' + $(this).data('data') + ')');
    requireComps(_templateName, _target, _data);
  });
  // requireComps('carousel', '.carousel-comps1', carsouelData);
  // requireComps('carousel', '.carousel-comps2', carsouelData2);
});