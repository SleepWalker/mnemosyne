var Backbone = require('backbone');

var storage;
var defaultSync = Backbone.sync;

function customSync(action, model, options) {
    options = options || {};

    // delete is the bad name for JS function :)
    var method = action == 'delete' ? 'destroy' : action;

    if(!crud[method]) {
        throw new Error('Unknown CRUD operation: '+action);
    }

    var result = crud[method].call(null, model);

    if(options.success) {
        options.success(result);
    }
}

function read(model) {
    if(model.id) {
        return storage.find(model.id);
    }

    // collection
    return storage.findAll(model);
}

function create(model) {
    return storage.create(model);
}

function update(model) {
    return storage.update(model);
}

function destroy(model) {
    return storage.destroy(model);
}

var crud = {
    read: read,
    create: create,
    update: update,
    destroy: destroy
};

/**
 * Overrides default Backbone sync if any storage provided
 */
function setStorage(st) {
    storage = st;

    Backbone.sync = storage ? customSync : defaultSync;

    return this;
}

function getStorage(st) {
    return storage;
}

module.exports = {
    setStorage: setStorage,
    getStorage: getStorage
};