/**
 * WebStorage persistance layer
 * 
 * @copyright Copyright &copy; 2013 Sviatoslav Danylenko
 * @author Sviatoslav Danylenko <dev@udf.su> 
 * @license MIT ({@link http://opensource.org/licenses/MIT})
 * @link https://github.com/SleepWalker/mnemosyne
 */

var _ = require('underscore');

function isStorageSupported() {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
}

if(!isStorageSupported()) {
    throw new Error('Sorry, but your browser does not support Web Storage.\nPlease update your browser or wait until we will support it.');
}

if(!JSON.stringify && !JSON.parse) {
    throw new Error('It seams, that we cant parse JSON strings');
}

var delimiter = '|';

function WebStorage(storageName)
{
    if(!storageName) {
        storageName = 'default';
    }

    // indexes to fetch collections of models
    // based on collection url
    var indexes = {};

    function createModel(model)
    {
        if(!model.id) {
            model.id = guid();
            model.set(model.idAttribute, model.id);
        }

        saveModel(model);

        return model.toJSON();
    }

    function saveModel(model) {
        set(modelId(model), JSON.stringify(model.toJSON()));

        if(indexHasModel(model)) {
            getIndex(model).push(model.id);
            saveIndex(model);
        }
    }

    function findAllModels(collection)
    {
        var index = getIndex(collection);

        var models = [];
        for(var i = 0; i < index.length; i++)
        {
            var id = index[i];
            var model = findModel(id);
            if(model) {
                models.push(model);
            }
        }

        return models;
    }

    function destroyModel(model)
    {
        remove(modelId(model));

        var index = getIndex(model);
        index = index
            .join(delimiter)
            .replace(model.id, '')
            .replace(delimiter+delimiter, '')
            ;
        index = trim(index, delimiter).split(delimiter);
        saveIndex(model, index);

        return model.toJSON();
    }

    function trim(str, charlist)
    {
        charlist = !charlist ? ' \s\xA0' : charlist.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '\$1');
        var re = new RegExp('^[' + charlist + ']+|[' + charlist + ']+$', 'g');
        return str.replace(re, '');
    }

    function findModel(id)
    {
        var data = get(modelId(id));

        if(!data) {
            throw new Error('No such data with id: ' + id);
        }

        return JSON.parse(data);
    }

    function modelId(model)
    {
        var id = model.id ? model.id : model;

        return storageName + '-' + id;
    }

    /**
     * @param  {array} index can be ommited, if we only altering
     *                       the object achieved from getIndex()
     */
    function saveIndex(model, index)
    {
        index = index ? index : getIndex(model);
        set(getIndexId(model), index.join(delimiter));
    }

    function indexHasModel(model)
    {
        return getIndex(model).join(delimiter).indexOf(model.id) == -1;
    }

    function getIndex(model)
    {
        if(indexes[getIndexId(model)]) {
            return indexes[getIndexId(model)];
        } else {
            var index = get(getIndexId(model));
            index = (index && index.split(delimiter)) || [];

            indexes[getIndexId(model)] = index;

            return index;
        }
    }

    function getIndexId(model)
    {
        if(model.collection) {
            model = model.collection;
        }

        var modelId = _.result(model, 'url') || urlError();
        
        return storageName + '-' + modelId;
    }

    function urlError()
    {
        throw new Error('A "url" property or function must be specified');
    }

    function getStorageName() {
        return storageName;
    }

    this.getStorageName = getStorageName;
    this.create = createModel;
    this.update = createModel;
    this.destroy = destroyModel;
    this.find = findModel;
    this.findAll = findAllModels;
}

function S4() {
   return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}

function guid() {
   return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

function get(key)
{
    return localStorage.getItem(key);
}

function set(key, value)
{
    localStorage.setItem(key, value);
}

function remove(key, value)
{
    localStorage.removeItem(key, value);
}

module.exports = WebStorage;