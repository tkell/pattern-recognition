
// Fancy SVG path things
function makePathString(locations) {
    pathString = 'M';
    pathString = pathString + locations[0].x + ',' + locations[0].y + ',L';
    for (var i = 1; i < locations.length; i++) {
        pathString = pathString + locations[i].x + ',' + locations[i].y
        if (i < locations.length - 1) {
            pathString = pathString + ',';
        }
    }
    pathString = pathString + 'z';
    return pathString;
}

// via http://blog.furiousbob.com/2011/01/31/having-fun-with-javascript-and-raphael/
// Note that startingAngle is in radians
function makePolyPoints(location, numberSides, radius, startingAngle) {
    locations = []
    for (var i = 0; i < numberSides; i++) {
        var point ={};
        var angle = startingAngle + (i * (1 / numberSides) * 2 * Math.PI);
        point.x = Math.round(location.x + (radius * Math.cos(angle)));
        point.y = Math.round(location.y + (radius * Math.sin(angle)));
        locations.push(point);
    }
    return locations;
}

function makeCircle(paper, location, radius, rotation) {
    var button = paper.circle(location.x, location.y, radius.x);
    return button;
}

function makeTri(paper, location, radius, rotation) {
    locations = makePolyPoints(location, 3, radius.x, rotation);
    pathString = makePathString(locations);
    var button = paper.path(pathString);
    return button;
}

function makeSquare(paper, location, radius, rotation) {
    locations = makePolyPoints(location, 4, radius.x, Math.PI / 4);
    pathString = makePathString(locations);
    var button = paper.path(pathString);
    return button;
}

// Rect is a special case.  Should probably be generalized at some point.
function makeRect(paper, location, radius, rotation) {
    locations = []
    for (var i = 0; i < 4; i++) {
        var point ={};
        var angle = Math.PI / 4 + (i * (1 / 4) * 2 * Math.PI) + rotation;
        point.x = Math.round(location.x + (radius.x * Math.cos(angle)));
        point.y = Math.round(location.y + (radius.y * Math.sin(angle)));
        locations.push(point);
    }

    pathString = makePathString(locations);
    var button = paper.path(pathString);
    return button;
}

function makeDiamond(paper, location, radius, rotation) {
    locations = makePolyPoints(location, 4, radius.x, 0);
    pathString = makePathString(locations);
    var button = paper.path(pathString);
    return button;
}

function makePenta(paper, location, radius, rotation) {
    locations = makePolyPoints(location, 5, radius.x, rotation);
    pathString = makePathString(locations);
    var button = paper.path(pathString);
    return button;
}

function makeHexa(paper, location, radius, rotation) {
    locations = makePolyPoints(location, 6, radius.x, rotation);
    pathString = makePathString(locations);
    var button = paper.path(pathString);
    return button;
}

function makeOcta(paper, location, radius, rotation) {
    locations = makePolyPoints(location, 8, radius.x, rotation);
    pathString = makePathString(locations);
    var button = paper.path(pathString);
    return button;
}

// Button creation
var allShapes = ['circle', 'triangle', 'square', 'diamond', 'rectangle', 'pentagon', 'hexagon', 'octagon'];
var buttonFunctions = {circle: makeCircle,
                       square: makeSquare,
                       diamond: makeDiamond,
                       rectangle: makeRect,
                       triangle: makeTri,
                       pentagon: makePenta,
                       hexagon: makeHexa,
                       octagon: makeOcta,
                    };