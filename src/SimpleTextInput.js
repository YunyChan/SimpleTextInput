/**
 * Created by yunying on 2016/7/11.
 */
(function(oWin, oDoc){
    // Helper
    var Helper = {
        listenEvent: fListenEvent,
        getDOM: fGetDOM
    };

    function fListenEvent(oDom, sEventName, fCallback, bUseCapture){
        if(oWin.attachEvent){
            oDom.attachEvent('on' + sEventName, function(){
                var oEvent = oWin.event;
                fCallback && fCallback(oEvent);
            });
        }else{
            oDom.addEventListener(sEventName, fCallback, !!bUseCapture);
        }
    }

    function fGetDOM(oRoot, sQuery) {
        var sMatch = sQuery.match(/([\w-]*):([\w-]*)/);
        var sTag = '';
        var sClass = '';
        if(sMatch.length > 1){
            sTag = sMatch[1];
            sClass = sMatch[2];
            var oTargetClassRegExp = new RegExp(sClass);
            var oDOMs = oRoot.getElementsByTagName(sTag);
            for(var cnt = 0, length = oDOMs.length; cnt < length; cnt ++){
                var oDOM = oDOMs[cnt];
                if(oTargetClassRegExp.test(oDOM.className)){
                    return oDOM;
                }
            }
        }
        return null;
    }

    var SimpleTextInput = fConstructor;
    // 静态变量
    //SimpleTextInput.prototype.xxx = '';
    // 静态方法
    SimpleTextInput.prototype.init = fInit;
    SimpleTextInput.prototype.initEvents = fInitEvents;
    SimpleTextInput.prototype.onFocus = fOnFocus;
    SimpleTextInput.prototype.onBlur = fOnBlur;
    SimpleTextInput.prototype.render = fRender;
    SimpleTextInput.prototype.renderDOM = fRenderDOM;
    SimpleTextInput.prototype.getValue = fGetValue;
    SimpleTextInput.prototype.setValue = fSetValue;
    SimpleTextInput.prototype.showPlaceholder = fShowPlaceholder;
    SimpleTextInput.prototype.hidePlaceholder = fHidePlaceholder;

    function fConstructor(oConf){
        this.config =  oConf = oConf || {};
        this.target = oConf.target;
        this.title = oConf.title || '';
        this.placeholder = oConf.placeholder || '';
        this.value = oConf.value || '';
        this.bind = !!oConf.bind;
        this.init();
        return this;
    }

    function fInit(){
        this.render();
        this.initEvents();
        this.setValue(this.value);
    }

    function fInitEvents() {
        var that = this;
        if(this.placeholder){
            Helper.listenEvent(this.input, 'focus', function () {
                that.onFocus();
            });
            Helper.listenEvent(this.input, 'blur', function () {
                that.onBlur();
            });
        }
        Helper.listenEvent(this.target, 'click', function (oEvent) {
            var oClickDom = oEvent.target || oEvent.srcElement;
            var sClassName = oClickDom.className;
            if(/simple-text-input-tip/.test(sClassName)){
                that.input.focus();
            }
            if(/simple-text-input-title/.test(sClassName)){
                that.input.focus();
            }
        });
    }

    function fOnFocus() {
        this.hidePlaceholder();
    }

    function fOnBlur() {
        if(this.input.value == ''){
            this.showPlaceholder();
        }
    }

    function fRender() {
        this.renderDOM();
        if(this.placeholder){
            this.tip.style.lineHeight = this.input.clientHeight + 'px';
        }
        this.rawClass = this.target.className;
        this.rootClass = (this.rawClass == ''? '' : ' ') + 'simple-text-input';
        this.target.className = this.rootClass;
    }

    function fRenderDOM() {
        if(this.bind){
            this.label = Helper.getDOM(this.target, 'label:simple-text-input-label');
            this.input = Helper.getDOM(this.target, 'input:simple-text-input-input');
            this.value = this.input.value;
            this.tip = Helper.getDOM(this.target, 'span:simple-text-input-placeholder');
            this.placeholder = this.tip ? this.tip.innerHTML : '';
            this.header = Helper.getDOM(this.target, 'span:simple-text-input-title');
            this.title = this.header ? this.header.innerHTML : '';
        }else{
            this.label = oDoc.createElement('label');
            this.label.className = 'simple-text-input-label';

            this.input = oDoc.createElement('input');
            this.input.type = 'text';
            this.input.className = 'simple-text-input-input';
            this.label.appendChild(this.input);

            if(this.placeholder){
                this.tip = oDoc.createElement('span');
                this.tip.className = 'simple-text-input-placeholder';
                this.tip.innerHTML = this.placeholder;
                this.label.appendChild(this.tip);
            }
            if(this.title){
                this.header = oDoc.createElement('span');
                this.header.className = 'simple-text-input-title';
                this.header.innerHTML = this.title;
                this.target.appendChild(this.header);
            }
            this.target.appendChild(this.label);
        }
    }

    function fGetValue() {
        this.value = this.input.value;
        return this.value;
    }

    function fSetValue(sRawValue) {
        this.value = sRawValue + '';
        this.input.value = this.value;
        if(this.placeholder){
            if(this.value == ''){
                this.showPlaceholder();
            }else{
                this.hidePlaceholder();
            }
        }
    }

    function fShowPlaceholder() {
        this.tip.style.display = '';
    }

    function fHidePlaceholder() {
        this.tip.style.display = 'none';
    }

    if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
        define(function() {
            return SimpleTextInput;
        });
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = function(oConf){
            return new SimpleTextInput(oConf);
        };
        module.exports.SimpleTextInput = SimpleTextInput;
    } else {
        if(!oWin.SimpleTextInput){
            oWin.SimpleTextInput = SimpleTextInput;
        }else{
            throw new Error("It's duplicate to defined 'SimpleList', please check the scripts which you has been imported!");
        }
    }

})(window, document);