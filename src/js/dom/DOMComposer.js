var $ = require('jquery');

module.exports = function(options) {
    return {
        compose: function compose(){
            var regions = options.regions;

            for(var selector in regions) {
                var BackboneView = new regions[selector]();

                BackboneView.render();

                $(selector).append(BackboneView.$el);
            }
        }
    };
};