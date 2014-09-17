/**
 * WebStorage persistance layer
 * 
 * @copyright Copyright &copy; 2013 Sviatoslav Danylenko
 * @author Sviatoslav Danylenko <dev@udf.su> 
 * @license MIT ({@link http://opensource.org/licenses/MIT})
 * @link https://github.com/SleepWalker/mnemosyne
 */

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

    index = get(storageName);
    index = (index && index.split(delimiter)) || [];

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

        if(index.join(delimiter).indexOf(model.id) == -1) {
            index.push(model.id);
            saveIndex();
        }
    }

    function modelId(model)
    {
        var id = model.id ? model.id : model;

        return storageName + '-' + id;
    }

    function saveIndex()
    {
        set(storageName, index.join(delimiter));
    }

    function findAllModels()
    {
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
        index = index
            .join(delimiter)
            .replace(model.id, '')
            .replace(delimiter+delimiter, '')
            .split(delimiter);
        saveIndex();

        return model.toJSON();
    }

    function findModel(id)
    {
        var data = get(modelId(id));

        if(!data) {
            throw new Error('No such data with id: ' + id);
        }

        return JSON.parse(data);
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