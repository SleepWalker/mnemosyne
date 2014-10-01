var _ = require('underscore');
var $ = require('jquery');
require('../../../bower_components/perfect-scrollbar/src/perfect-scrollbar.js');

var Morph = function($button, $modal) {
    this.$button = $button;
    this.$modal = $modal;
    this.$all = this.$button.add(this.$modal);

    this.measure();
    this.fit();
};

Morph.prototype.fit = function() {
    this.$modal.css(this.buttonPosition);
};

Morph.prototype.measure = function() {
    var $el = this.$modal;

    var initialCss = {
        position: $el.css('position'),
        left: $el.css('left')
    };

    $el.css({
        position: 'fixed',
        left: '-50000px'
    });

    this.dimensions = {
        width: $el.width(),
        height: $el.height()
    };

    var offset = this.$button.offset();
    this.buttonPosition = {
        left: offset.left,
        top: offset.top,
        width: this.$button.outerWidth(),
        height: this.$button.outerHeight()
    };

    $el.css(initialCss);
};

Morph.prototype.show = function() {
    this.$all.addClass('no-transition');
    setTimeout(_.bind(function() {
        this.$all.removeClass('no-transition');
        this.$all.addClass('morph-active');
        this.release();
        this.attachScroll();
    }, this), 1);
};

Morph.prototype.release = function() {
    this.$modal.css(this.dimensions);
};

Morph.prototype.attachScroll = function() {
    this.$modal.perfectScrollbar({
        suppressScrollX: true,
    });
};

Morph.prototype.hide = function() {
    this.dettachScroll();
    this.fit();
    this.$all.removeClass('morph-active');
};

Morph.prototype.dettachScroll = function() {
    this.$modal.perfectScrollbar('destroy');
};

module.exports = {
    initialize: function() {
        this.listenTo(this, 'afterFormRender', this.showMorph);
        this.listenTo(this, 'beforeFormRemove', this.hideMorph);
    },

    showMorph: function($button, formInstance) {
        this.morph = new Morph($button, formInstance.$el);
        this.morph.show();
    },

    hideMorph: function($button, formInstance) {
        this.morph.hide();
    }
};