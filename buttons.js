// Colleciton of functions for drawing buttons and organizing button data


var allSizes = ['tiny', 'small', 'medium', 'large', 'huge', 'gigantic'];

// I am missing 'area' / any way to disambiguate rectangles
// For rects and ellipses, I should take the larger of the two dimensions
// I should also compute area, dammit
function addButton(b, location, color, shape, radius) {
    // Calculate brightness
    red = parseInt(color.substring(1, 3), 16);
    green = parseInt(color.substring(3, 5), 16);
    blue = parseInt(color.substring(5, 7), 16);
    brightness = red + green + blue / 3;

    // Get side count
    var sides;
    if (shape == 'circle') {
        sides = 0;
    } else if (shape == 'triangle') {
        sides = 3;
    } else if (shape == 'pentagon') {
        sides = 5;
    } else if (shape == 'hexagon') {
        sides = 6;
    } else if (shape == 'octagon') {
        sides = 8;
    } else {
        sides = 4;
    }

    // I am sure there is a cute way to get this programmaticaly, but I won't sweat it for now
    // also I need to sort out "radius" for rectangles
    radius = radius.x;
    var size;
    if (radius < 8) {
        size = 'tiny';
    } else if (radius < 16) {
        size = 'small';
    } else if (radius < 32) {
        size = 'medium';
    } else if (radius < 64) {
        size = 'large';
    } else if (radius < 128) {
        size = 'huge';
    } else if (radius < 256) {
        size = 'gigantic';
    }

    var buttonObject = {
        button: b,
        location: location,
        shape: shape,
        sides: sides,
        radius: radius,
        size: size,
        color: color,
        brightness: brightness
    };
   buttonData.push(buttonObject);
}


function makeButton(paper, location, color, shape, radius, rotation, modFunctions, modIndex) {
    var currentLocation = {};
    if (modFunctions.xLocation) {
        currentLocation.x = location.x + modFunctions.xLocation(modIndex);
    } else {
        currentLocation.x = location.x;
    }
    if (modFunctions.yLocation) {
        currentLocation.y = location.y + modFunctions.yLocation(modIndex);
    } else {
        currentLocation.y = location.y;
    }

    var currentColor;
    if (modFunctions.color) {
        currentColor = modFunctions.color(modIndex);
    } else {
        currentColor = color;
    }

    var currentShape;
    if (modFunctions.shape) {
        currentShape = modFunctions.shape(modIndex);
    } else {
        currentShape = shape;
    }

    var currentRadius = {}
    if (modFunctions.radius) {
        currentRadius.x = radius.x + modFunctions.radius(modIndex);
        currentRadius.y = radius.y + modFunctions.radius(modIndex);
        if (currentRadius.x < 1) {currentRadius.x = 1;}
        if (currentRadius.y < 1) {currentRadius.y = 1;}
    } else {
        currentRadius = radius;
    }

    var currentRotation;
    if (modFunctions.rotation) {
        currentRotation = rotation + modFunctions.rotation(modIndex);
    } else {
        currentRotation = rotation;
    }

    // This is where we actually draw the button.
    // This odd conditional is so we can use these functions to generate
    // raw button difference data, without having to futz with drawing the data
    if (paper != 'fake-paper') {
        var button = buttonFunctions[currentShape](paper, currentLocation, currentRadius, currentRotation)
        button.attr("fill", currentColor);
    }
    // and THIS deals with the data..
    addButton(button, currentLocation, currentColor, currentShape, currentRadius, currentRotation);
 }

function makeRandomButton(paper) {
    var minDimension = Math.min(paper.width, paper.height);
    var maxRadius = parseInt(minDimension / 3);
    var location = {x: Math.floor((Math.random() * paper.width)), y: Math.floor((Math.random() * paper.height))};
    var color = '#' + Math.floor(Math.random() * 16777215).toString(16);
    var shapeIndex =  Math.floor(Math.random() * allShapes.length);
    var shape = allShapes[shapeIndex];
    var rotation = Math.random() * 2 * Math.PI;
    var radius = {x: Math.floor(Math.random() * maxRadius) + 1, y: Math.floor(Math.random() * maxRadius) + 1};
    makeButton(paper, location, color, shape, radius, rotation);
 }