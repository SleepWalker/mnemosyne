var $ = require('jquery');

module.exports = function(options) {
    return {
        compose: function compose() {
            var BackboneView;
            var viewOptions;
            var regions = options.regions;

            for(var selector in regions) {
                var regionViews = regions[selector];
                if(!(regionViews instanceof Array)) {
                    regionViews = [regionViews];
                }

                for (var i = 0; i < regionViews.length; i++) {
                    viewOptions = {};
                    if(regionViews[i] instanceof Array) {
                        viewOptions = regionViews[i][1];
                        regionViews[i] = regionViews[i][0];
                    }
                    
                    BackboneView = new regionViews[i](viewOptions);

                    BackboneView.render();

                    $(selector).append(BackboneView.$el);
                }
            }
        }
    };
};