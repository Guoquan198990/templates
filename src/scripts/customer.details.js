function iframeLoaded(obj) {
    $(obj).prev().fadeOut();
}

// table 隔列变色
function tableColor() {
    $('table td').each(function(i, val) {
        if(i % 2 === 0) {
            $(this).addClass('bg-td');
        }
    });
}

$(document).ready(function() {
    tableColor();
    $('.title-item').click(function(e) {
        e.preventDefault();
        var _this = $(this);
        var _parent = _this.parent();
        var _next = _parent.next();
        var iframeSrc = _this.data('iframe') || '';
        var loadedPop = '<div class="loading-wrap"><div class="loader loader--style3" title="2">'
                  + '<svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">'
                  + '<path fill="#000" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">'
                    + '<animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite"/>'
                    + '</path>'
                  + '</svg>'
                + '</div></div>';
        var loadedIe = '<div class="loading-wrap"><div class="loader">加载中…</div><div>';

        var loadedHtml = window.addEventListener ? loadedPop : loadedIe;

        if(iframeSrc) {
            var iframeHtml = '<iframe src="' + iframeSrc + '" onload="iframeLoaded(this)"></iframe>';
            _next.addClass('iframe-wrap').append(loadedHtml).append(iframeHtml);
        }

        if(_this.is('.active')) {
            _this.removeClass('active');
            _next.hide();
        } else {
            _this.addClass('active');
            _next.show();

        }
    });

    $('.tab-panel a').click(function(e) {
        e.preventDefault();
        var _this = $(this);
        var _parents = _this.parents('.tab-panel');
        var _next = _parents.next();
        var _index = _this.index();
        _this.addClass('active').siblings().removeClass('active');
        _next.children().eq(_index).addClass('active').siblings().removeClass('active');
    });
});