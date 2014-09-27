module.exports = {
    events: {
        'click .js-destroy': 'destroyModel',
    },

    initialize: function(options)
    {
        this.listenTo(this.model, 'destroy', this.remove);
    },

    destroyModel: function(event) {
        event.stopPropagation();
        event.preventDefault();

        this.model.destroy();
    }
};