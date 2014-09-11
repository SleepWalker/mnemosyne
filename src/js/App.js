var configured = false, isRunning = false;
var config;

function configure(c) {
    if(configured) {
        throw new Error('The app is already configured');
    }

    if(!c.components.composer) {
        throw new Error('You sould provide composer object');
    }

    if(!c.components.storage) {
        throw new Error('You sould provide storage object');
    }

    config = c;

    for(var p in api) {
        this[p] = api[p];
    }

    configured = true;
}

function run()
{
    if(isRunning) {
        throw new Error('The app is already running');
    }

    getComponent('storage').open();
    getComponent('composer').compose();

    isRunning = true;
}

function hasComponent(componentName)
{
    return componentName in config.components;
}

function getComponent(componentName)
{
    if(hasComponent(componentName)) {
        return config.components[componentName];
    }
    
    return false;
}

function setComponent(componentName, component)
{
    config.components[componentName] = component;

    return component;
}

var api = {
    hasComponent: hasComponent,
    getComponent: getComponent,
    setComponent: setComponent,
    run: run
};

module.exports = {
    configure: configure,
};