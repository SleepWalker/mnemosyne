var $ = require('jquery');

module.exports = function(options) {
    return {
        compose: function compose(){
            var regions = options.regions;

            for(var selector in regions) {
                var regionViews = regions[selector];
                if(!(regionViews instanceof Array)) {
                    regionViews = [regionViews];
                }

                for (var i = 0; i < regionViews.length; i++) {
                    var BackboneView = new regionViews[i]();

                    BackboneView.render();

                    $(selector).append(BackboneView.$el);
                }
            }
        }
    };
};