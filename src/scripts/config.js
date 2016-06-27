// 该文件主要完成的内容
/*
  1. UPLOAD_IMG_TYPE：上传封面的图片的格式
  2. QQ_FACE：QQ 表情的数据
  3. TAGS：添加标签时，常用标签的数据，如果是自定义的标签，则对应的 code 统一为 10000
*/

window.TRAVEL_CONFIG = {
  UPLOAD_IMG_TYPE: '.jpg，.bmp，jpeg，.png',
  QQ_FACE: [{"name":"[微笑]","url":"http://x.autoimg.cn/club/smiles/0.gif"},{"name":"[撇嘴]","url":"http://x.autoimg.cn/club/smiles/1.gif"},{"name":"[色]","url":"http://x.autoimg.cn/club/smiles/2.gif"},{"name":"[发呆]","url":"http://x.autoimg.cn/club/smiles/3.gif"},{"name":"[得意]","url":"http://x.autoimg.cn/club/smiles/4.gif"},{"name":"[流泪]","url":"http://x.autoimg.cn/club/smiles/5.gif"},{"name":"[害羞]","url":"http://x.autoimg.cn/club/smiles/6.gif"},{"name":"[闭嘴]","url":"http://x.autoimg.cn/club/smiles/7.gif"},{"name":"[睡]","url":"http://x.autoimg.cn/club/smiles/8.gif"},{"name":"[大哭]","url":"http://x.autoimg.cn/club/smiles/9.gif"},{"name":"[尴尬]","url":"http://x.autoimg.cn/club/smiles/10.gif"},{"name":"[发怒]","url":"http://x.autoimg.cn/club/smiles/11.gif"},{"name":"[调皮]","url":"http://x.autoimg.cn/club/smiles/12.gif"},{"name":"[嘻嘻]","url":"http://x.autoimg.cn/club/smiles/13.gif"},{"name":"[惊讶]","url":"http://x.autoimg.cn/club/smiles/14.gif"},{"name":"[难过]","url":"http://x.autoimg.cn/club/smiles/15.gif"},{"name":"[酷]","url":"http://x.autoimg.cn/club/smiles/16.gif"},{"name":"[冷汗]","url":"http://x.autoimg.cn/club/smiles/17.gif"},{"name":"[抓狂]","url":"http://x.autoimg.cn/club/smiles/18.gif"},{"name":"[吐]","url":"http://x.autoimg.cn/club/smiles/19.gif"},{"name":"[偷笑]","url":"http://x.autoimg.cn/club/smiles/20.gif"},{"name":"[可爱]","url":"http://x.autoimg.cn/club/smiles/21.gif"},{"name":"[白眼]","url":"http://x.autoimg.cn/club/smiles/22.gif"},{"name":"[傲慢]","url":"http://x.autoimg.cn/club/smiles/23.gif"},{"name":"[饥饿]","url":"http://x.autoimg.cn/club/smiles/24.gif"},{"name":"[困]","url":"http://x.autoimg.cn/club/smiles/25.gif"},{"name":"[惊恐]","url":"http://x.autoimg.cn/club/smiles/26.gif"},{"name":"[汗]","url":"http://x.autoimg.cn/club/smiles/27.gif"},{"name":"[憨笑]","url":"http://x.autoimg.cn/club/smiles/28.gif"},{"name":"[大兵]","url":"http://x.autoimg.cn/club/smiles/29.gif"},{"name":"[奋斗]","url":"http://x.autoimg.cn/club/smiles/30.gif"},{"name":"[咒骂]","url":"http://x.autoimg.cn/club/smiles/31.gif"},{"name":"[疑问]","url":"http://x.autoimg.cn/club/smiles/32.gif"},{"name":"[嘘]","url":"http://x.autoimg.cn/club/smiles/33.gif"},{"name":"[晕]","url":"http://x.autoimg.cn/club/smiles/34.gif"},{"name":"[折磨]","url":"http://x.autoimg.cn/club/smiles/35.gif"},{"name":"[衰]","url":"http://x.autoimg.cn/club/smiles/36.gif"},{"name":"[骷髅]","url":"http://x.autoimg.cn/club/smiles/37.gif"},{"name":"[敲打]","url":"http://x.autoimg.cn/club/smiles/38.gif"},{"name":"[再见]","url":"http://x.autoimg.cn/club/smiles/39.gif"},{"name":"[擦汗]","url":"http://x.autoimg.cn/club/smiles/40.gif"},{"name":"[挖鼻]","url":"http://x.autoimg.cn/club/smiles/41.gif"},{"name":"[鼓掌]","url":"http://x.autoimg.cn/club/smiles/42.gif"},{"name":"[糗大了]","url":"http://x.autoimg.cn/club/smiles/43.gif"},{"name":"[坏笑]","url":"http://x.autoimg.cn/club/smiles/44.gif"},{"name":"[左哼哼]","url":"http://x.autoimg.cn/club/smiles/45.gif"},{"name":"[右哼哼]","url":"http://x.autoimg.cn/club/smiles/46.gif"},{"name":"[哈欠]","url":"http://x.autoimg.cn/club/smiles/47.gif"},{"name":"[鄙视]","url":"http://x.autoimg.cn/club/smiles/48.gif"},{"name":"[委屈]","url":"http://x.autoimg.cn/club/smiles/49.gif"},{"name":"[快哭了]","url":"http://x.autoimg.cn/club/smiles/50.gif"},{"name":"[阴险]","url":"http://x.autoimg.cn/club/smiles/51.gif"},{"name":"[亲亲]","url":"http://x.autoimg.cn/club/smiles/52.gif"},{"name":"[吓]","url":"http://x.autoimg.cn/club/smiles/53.gif"},{"name":"[可怜]","url":"http://x.autoimg.cn/club/smiles/54.gif"},{"name":"[菜刀]","url":"http://x.autoimg.cn/club/smiles/55.gif"},{"name":"[西瓜]","url":"http://x.autoimg.cn/club/smiles/56.gif"},{"name":"[啤酒]","url":"http://x.autoimg.cn/club/smiles/57.gif"},{"name":"[篮球]","url":"http://x.autoimg.cn/club/smiles/58.gif"},{"name":"[乒乓]","url":"http://x.autoimg.cn/club/smiles/59.gif"},{"name":"[咖啡]","url":"http://x.autoimg.cn/club/smiles/60.gif"},{"name":"[饭]","url":"http://x.autoimg.cn/club/smiles/61.gif"},{"name":"[猪头]","url":"http://x.autoimg.cn/club/smiles/62.gif"},{"name":"[玫瑰]","url":"http://x.autoimg.cn/club/smiles/63.gif"},{"name":"[凋零]","url":"http://x.autoimg.cn/club/smiles/64.gif"},{"name":"[示爱]","url":"http://x.autoimg.cn/club/smiles/65.gif"},{"name":"[爱心]","url":"http://x.autoimg.cn/club/smiles/66.gif"},{"name":"[心碎]","url":"http://x.autoimg.cn/club/smiles/67.gif"},{"name":"[蛋糕]","url":"http://x.autoimg.cn/club/smiles/68.gif"},{"name":"[闪电]","url":"http://x.autoimg.cn/club/smiles/69.gif"},{"name":"[炸弹]","url":"http://x.autoimg.cn/club/smiles/70.gif"},{"name":"[刀]","url":"http://x.autoimg.cn/club/smiles/71.gif"},{"name":"[足球]","url":"http://x.autoimg.cn/club/smiles/72.gif"},{"name":"[瓢虫]","url":"http://x.autoimg.cn/club/smiles/73.gif"},{"name":"[便便]","url":"http://x.autoimg.cn/club/smiles/74.gif"},{"name":"[月亮]","url":"http://x.autoimg.cn/club/smiles/75.gif"},{"name":"[太阳]","url":"http://x.autoimg.cn/club/smiles/76.gif"},{"name":"[礼物]","url":"http://x.autoimg.cn/club/smiles/77.gif"},{"name":"[拥抱]","url":"http://x.autoimg.cn/club/smiles/78.gif"},{"name":"[强]","url":"http://x.autoimg.cn/club/smiles/79.gif"},{"name":"[弱]","url":"http://x.autoimg.cn/club/smiles/80.gif"},{"name":"[握手]","url":"http://x.autoimg.cn/club/smiles/81.gif"},{"name":"[胜利]","url":"http://x.autoimg.cn/club/smiles/82.gif"},{"name":"[抱拳]","url":"http://x.autoimg.cn/club/smiles/83.gif"},{"name":"[勾引]","url":"http://x.autoimg.cn/club/smiles/84.gif"},{"name":"[拳头]","url":"http://x.autoimg.cn/club/smiles/85.gif"},{"name":"[差劲]","url":"http://x.autoimg.cn/club/smiles/86.gif"},{"name":"[爱你]","url":"http://x.autoimg.cn/club/smiles/87.gif"},{"name":"[NO]","url":"http://x.autoimg.cn/club/smiles/88.gif"},{"name":"[OK]","url":"http://x.autoimg.cn/club/smiles/89.gif"}],
  TAGS: [
    {
      'code': 0060001000001,
      'text': '自然风貌'
    },
    {
      'code': 0040001000001,
      'text': '购物'
    },
    {
      'code': 0060001000004,
      'text': '海岛'
    },
    {
      'code': 0060001000002,
      'text': '民俗文化'
    },
    {
      'code': 0060001000010,
      'text': '自驾'
    },
    {
      'code': 0060001000013,
      'text': '潜水'
    },
    {
      'code': 0060001000015,
      'text': '户外'
    },
    {
      'code': 0030001000003,
      'text': '露营'
    },
    {
      'code': 0060006000002,
      'text': '免签'
    }
  ]
}