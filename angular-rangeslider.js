/**
 * Created by Adibas03@gmail.com on 8/31/2016.
 */

/**
 * https://github.com/adibas03/angular-rangeslider.js
 * Tweak to rangeslider.js `http://rangesliderjs.org` to enable flow with Angularjs `http://angularjs.org`
 * Instantiate with Scope
 */

/**
 *
 * @param scope String (required)The angular scope to be used by the plugin
 * @param runAtStart bool (optional) True if to run a check at start else false. Default true
 */
var angularRangeslider = function(props){
    if(!props.scope){
        console.log('Scope needed to instantiate plugin');
        return false;
    }

    this.scope = props.scope;
    this.runAtStart = (typeof(props.runAtStart)!='undefined')?props.runAtStart:true;
    this.stopOnScopeChange = (typeof(props.stopOnScopeChange)!='undefined')?props.stopOnScopeChange:true;
    this.windowEnabled = (typeof(props.windowEnabled)!='undefined')?props.windowEnabled:true;
    this.inputAttribute = (typeof(props.inputAttribute)!='undefined')?props.inputAttribute:'data-rangeslider';
    
    
    if(this.windowEnabled)window.angularRangeslider = this;
}

angularRangeslider.prototype= {

    start: function () {

        this.scope.initiateSlideWatch = this.initiateSlideWatch

        this.scope.initiateSlideWatch();
        if(this.runAtStart)this.scope.initiateSlideWatch();
        this.watching = true;

        if(this.stopOnScopeChange)
        this.scope.$on('$destroy', function () {
            angularRangeslider.reset();
        });
    },
    initiateSlideWatch: function(){
        $("input["+this.inputAttribute+"]").change(function (a) {
            angularRangeslider.updateRangeModel(a.target);
        });
    },
    updateRangeModel: function (e){
        this.scope[e.getAttribute('ng-model')] = e.value;
        this.scope.$apply();
    },
    updateAllRangeModels: function(){
        $("input["+this.inputAttribute+"]").change(function (a) {
            angularRangeslider.updateRangeModel(a.target);
        });
    },
    reset: function(){
        $("input["+this.inputAttribute+"]").off('change');
        $('input[type="range"]').rangeslider('destroy');
        this.watching = false;
    }
}
