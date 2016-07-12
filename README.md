# SimpleTextInput [![license](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://github.com/YunyChan/SimpleTextInput/blob/master/LICENSE) #

一个兼容IE的带有标题和提示的简易单行文本输入组件。

## 快速开始 ##

+ 直接从上面下载
+ 克隆项目：https://github.com/YunyChan/SimpleTextInput.git

## 使用 ##

首先在页面中引入`SimpleTextInput.js`JS文件

```html
<script src="SimpleTextInput.js"></script>
```

然后通过创建SimpleTextInput的实例并传入相应的参数来插入并使用组件

```html
<div id="text"></div>
<script src="SimpleTextInput.js"></script>
<script>
    var oText = new SimpleTextInput({
        target: document.getElementById('text'),
        value: '',
        title: 'UserName',
        placeholder: 'Your name!'
    });
</script>
```

下面是组件的配置参数说明：

+ `target` - __必须__, 需要插入组件的dom元素
+ `bind` - _default: false_, 是否从已有DOM渲染组件
+ `value` - _default: ''_, 组件初始化时输入框默认值，默认空字符串
+ `title` - _default: ''_, 组件标题，默认为空字符串
+ `placeholder` - _default: ''_, 组件输入框默认提示信息，默认为空字符串

APIs

* `getValue()` - 获取组件输入框值
* `setValue(String)` - 设置组件输入框值

## 作者 ##

Yuny Chan

+ [GitHub：https://github.com/YunyChan](https://github.com/YunyChan)
+ [博客：http://yuny.me/](http://yuny.me/)