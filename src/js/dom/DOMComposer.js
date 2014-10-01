var $ = require('jquery');

module.exports = function(options) {
    function eachRegion(callback) {
        var regions = options.regions;
        var regionViews;

        for(var selector in regions) {
            regionViews = regions[selector];

            callback(selector, regionViews);
        }
    }

    return {
        compose: function compose() {
            eachRegion(function(selector, regionViews) {
                var BackboneView;
                var viewOptions;

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
            });
        },

        reset: function() {
            eachRegion(function(selector) {
                $(selector).empty();
            });
        }
    };
};