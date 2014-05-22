// Collection of functions for modifying layouts on the fly,
// and example objects for the same

// Simple modification functions
function randomizeColor(index) {
    return '#'+ Math.floor(Math.random() * 16777215).toString(16);
}

function randomizeShape(index) {
    return allShapes[Math.floor(Math.random() * allShapes.length)]
}

function randomizeIntegerParam(index) {
    return Math.floor(Math.random() * 15);
}

function indexedIntegerParam(index) {
    return Math.floor(Math.random() * index * 10);
}

function randomizeRadianParam(index) {
    return Math.random() * Math.PI * 2;
}

function setIntegerParam(size) {
    return Math.floor(Math.random() * size);
}


var locationJitterFunctions = {
    'xLocation': randomizeIntegerParam,
    'yLocation': randomizeIntegerParam,
    'color':  null,
    'shape':  null,
    'radius': null, 
    'rotation': null,
};



modFunctions = {
    'xLocation': randomizeIntegerParam,
    'yLocation': randomizeIntegerParam,
    'color':  randomizeColor,
    'shape':  null,
    'radius': indexedIntegerParam, 
    'rotation': randomizeRadianParam,
}

pianoModFunctions = {
    'location': null,
    'color':  randomizeColor,
    'shape':  randomizeShape,
    'radius': null, 
    'rotation': randomizeRadianParam,
}

pianoModFunctionsNoShape = {
    'location': null,
    'color':  randomizeColor,
    'shape':  null,
    'radius': null, 
    'rotation': randomizeRadianParam,
}

xyloModFunctions = {
    'xLocation': randomizeIntegerParam,
    'yLocation': randomizeIntegerParam,
    'color':  randomizeColor,
    'shape':  null,
    'radius': indexedIntegerParam, 
    'rotation': randomizeRadianParam,
}