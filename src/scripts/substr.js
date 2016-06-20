/**
 * [truncate 按字节截取字符串]
 * @param  {[function]}  getLength [获取长度的方法]
 * @param  {[string]}  string [截取的字符串]
 * @param  {[number]}  byteLength [截取的长度]
 * @return {string}           [返回截取后的字符串]
 */

function byteLen(str) {
    if (str == null) return 0;
    if (typeof str != "string") {
        str += "";
    }
    return str.replace(/[^\x00-\xff]/g, "01").length;
}
function isHighSurrogate(codePoint) {
    return codePoint >= 0xd800 && codePoint <= 0xdbff;
}

function isLowSurrogate(codePoint) {
    return codePoint >= 0xdc00 && codePoint <= 0xdfff;
}

// Truncate string by size in bytes
function truncate(string, byteLength) {
    if (typeof string !== "string") {
        throw new Error("Input must be string");
    }

    var charLength = string.length;
    var curByteLength = 0;
    var codePoint;
    var segment;

    for (var i = 0; i < charLength; i += 1) {
        codePoint = string.charCodeAt(i);
        segment = string[i];

        if (isHighSurrogate(codePoint) && isLowSurrogate(string.charCodeAt(i + 1))) {
            i += 1;
            segment += string[i];
        }

        curByteLength += byteLen(segment);

        if (curByteLength === byteLength) {
            return string.slice(0, i + 1);
        } else if (curByteLength > byteLength) {
            return string.slice(0, i - segment.length + 1);
        }
    }

    return string;
}


