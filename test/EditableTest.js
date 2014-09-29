var assert = require('chai').assert;
var sinon = require('sinon');

var Backbone = require('backbone');
var Editable = require('../src/js/mixins/Editable');
var BaseFormView = require('../src/js/views/BaseFormView');
var Cocktail = require('backbone.cocktail');
Backbone.$ = require('jquery');

// Stubs
var model = new Backbone.Model();
var FormStub = BaseFormView.extend({
    render: function() {
        this.$el.append(Backbone.$('<form id="form"><input type="text"><span class="js-cancel"></span></form>'));
    },
    collection: {
        create: function(newModel, options) {options.success();}
    },
});

var View = Backbone.View.extend({
    formView: FormStub,
    model: model,
});
Cocktail.mixin(View, Editable);

describe('Editable', function() {
    describe('Interface checks', function() {
        it('it should error, when main view has no formView property', function() {
            assert.throws(function() {
                var WrongView = Backbone.View.extend({});
                Cocktail.mixin(WrongView, Editable);
                
                var view = new WrongView();
            }, /formView/);
        });

        it('it should error, when formView is not BaseFormView', function() {
            assert.throws(function() {
                var WrongView = Backbone.View.extend({
                    formView: {},
                });
                Cocktail.mixin(WrongView, Editable);
                
                var view = new WrongView();
            }, /BaseFormView/);
        });
    });

    var view;

    beforeEach(function() {
        view = new View();

        view.render();
    });

    it('should not render with the main view', function() {
        assert.ok(view.$el.children().length === 0);
    });

    describe('should listen to .js-edit clicks', function() {
        afterEach(function() {
            view.remove();
        });

        it('should not render if no .js-edit', function() {
            view.$el.click();
            assert.equal(
                view.$el.children().length, 0,
                'click on root element'
                );

            view.$el.append('<div>');
            view.$el.children().click();

            assert.equal(view.$el.children().length, 1);
        });

        it('should render on click on root element .js-edit', function() {
            view.$el.addClass('js-edit');

            view.$el.click();

            assert.equal(view.$el.children().length, 1);
        });

        it('should render on .js-edit click only ONCE', function() {
            view.$el.addClass('js-edit');

            view.$el.click().click();

            assert.equal(view.$el.children().length, 1);
        });

        it('should render on click on child with .js-edit', function() {
            var $triggerEl = Backbone.$('<div class="js-edit">');
            view.$el.append($triggerEl);

            $triggerEl.click();

            assert.equal(view.$el.children().length, 2);
        });

        it('should render in container specified', function() {
            var view = new View({
                $formRenderTarget: 'body',
            });
            view.render();
            view.$el.addClass('js-edit');
            Backbone.$('body').append(view.$el);

            view.$el.click().click();

            assert.equal(
                Backbone.$('#form').parent().parent()[0].tagName,
                'BODY'
                );
        });

        it('should add .active class after append', function() {
            view.$el.addClass('js-edit');

            view.$el.click();

            assert.ok(view.$('#form').parent().hasClass('active'));
        });

        it('should remove .active after .js-cancel or .js-remove called and transition ended', function() {
            view.$el.addClass('js-edit');
            view.$el.click();
            var $container = view.$('#form').parent();

            assert.ok(
                $container.hasClass('active'),
                '.active should stay before click'
                );

            view.$('.js-cancel').click();
            // TODO: test before transition
            // assert.ok(
            //     $container.hasClass('active'),
            //     '.active should stay on click'
            //     );

            $container.trigger('transitionend');
            assert.notOk(
                $container.hasClass('active'),
                'there should be no .active on transition end'
                );
        });

        describe('should interact with BaseFormView on click', function() {
            beforeEach(function() {
                view.$el.addClass('js-edit');
                view.$el.click();
            });

            it('should append form to main view', function() {
                assert.equal(view.$("#form").length, 1);
            });

            // it('it should set focus on the first input', function() {
            //     assert.ok(view.$(':focus').length > 0);
            // });

            it('should remove itself, when model saved', function() {
                var form = view.getFormInstance();

                assert.ok(form.removeOnSave);
            });

            it('should be editable after for the second time too', function() {
                view.getFormInstance().saveModel();

                view.$el.click();

                assert.equal(view.$el.children().length, 1);
            });
        });
    });
});