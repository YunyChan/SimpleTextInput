/**
 * Created by yunying on 2016/7/11.
 */
(function(oWin, oDoc){
    // Helper
    var Helper = {
        listenEvent: fListenEvent,
        stopPropagation: fStopPropagation,
        preventDefault: fPreventDefault
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

    function fStopPropagation(oEvent) {
        try{
            oEvent.stopPropagation();
        }catch(e){
            oEvent.cancelBubble = true;
        }
    }

    function fPreventDefault(oEvent) {
        try {
            oEvent.preventDefault();
        }catch(e){
            oEvent.returnValue = false;
        }
    }


    var SimpleTextInput = fConstructor;
    // 静态变量
    //SimpleTextInput.prototype.xxx = '';
    // 静态方法
    SimpleTextInput.prototype.init = fInit;
    SimpleTextInput.prototype.initEvents = fInitEvents;
    SimpleTextInput.prototype.render = fRender;

    function fConstructor(oConf){
        this.config =  oConf = oConf || {};
        this.target = oConf.target;
        this.title = oConf.title || '';
        this.placeholder = oConf.placeholder || '';
        this.init();
        return this;
    }

    function fInit(){
        this.render();
        this.initEvents();
    }

    function fInitEvents() {
        var that = this;
    }

    function fRender() {
        this.label = oDoc.createElement('label');
        this.label.className = 'simple-text-input-label';

        this.input = oDoc.createElement('input');
        this.input.type = 'text';
        this.input.className = 'simple-text-input-input';

        if(this.title){
            this.header = oDoc.createElement('span');
            this.header.className = 'simple-text-input-title';
            this.header.innerHTML = this.title;
            this.label.appendChild(this.header);
        }

        this.label.appendChild(this.input);

        if(this.placeholder){
            this.tip = oDoc.createElement('span');
            this.tip.className = 'simple-text-input-tip';
            this.tip.innerHTML = this.placeholder;
            this.label.appendChild(this.tip);
        }

        this.rawClass = this.target.className;
        this.rootClass = (this.rawClass == ''? '' : ' ') + 'simple-text-input';
        this.target.appendChild(this.label);
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