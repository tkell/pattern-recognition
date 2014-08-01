// Colleciton of functions for drawing parts of layouts (lines, etc)
// and entire layouts (grids, pianos, etc)

function makeLine(paper, startingPoint, length, spacing, angle, buttonColor, buttonShape, buttonRadius, buttonRotation, modFunctions) {
        for (var i = 0; i < length; i++) {
            var x = Math.floor(Math.cos(angle) * (i * (spacing + 2 * buttonRadius.x))) + startingPoint.x;
            var y = Math.floor(Math.sin(angle) * (i * (spacing + 2 * buttonRadius.y))) + startingPoint.y;
            var location = {x: x, y: y};
            makeButton(paper, location, buttonColor, buttonShape, buttonRadius, buttonRotation, modFunctions, i);
    } 
}

function makeRow(paper, startingPoint, length, spacing, buttonColor, buttonShape, buttonRadius, buttonRotation, modFunctions) {
    // example:  makeRow(paper, {x: 50, y: 100}, 6, 20, '#AA0000', 'circle', {x:50, y:50}, 0, modFunctions);
    makeLine(paper, startingPoint, length, spacing, 0, buttonColor, buttonShape, buttonRadius, buttonRotation, modFunctions);
}

function makeColumn(paper, startingPoint, length, spacing, buttonColor, buttonShape, buttonRadius, buttonRotation, modFunctions) {
    // example:  makeColumn(paper, {x: 50, y: 100}, 6, 20, '#AA0000', 'circle', {x:50, y:50}, 0, modFunctions);
    makeLine(paper, startingPoint, length, spacing, Math.PI / 2, buttonColor, buttonShape, buttonRadius, buttonRotation, modFunctions);
}

function makeColumnGrid(paper, startingPoint, width, height, spacing, offset, buttonColor, buttonShape, buttonRadius, buttonRotation, modFunctions) {
    // example:  makeOffsetColumnGrid(paper, {x:50, y:50}, 3, 5, {x: 20, y:10}, 2, '#AA0000', 'circle', {x:50, y:50}, 0, modFunctions);
    for (var i = 0; i < width; i++) {
        if (i % 2 == 0) {
            var newStartingPoint = {};
            newStartingPoint.x = startingPoint.x + (i * (spacing.x + 2 * buttonRadius.x));
            newStartingPoint.y = startingPoint.y;
        } else {
            var newStartingPoint = {};
            newStartingPoint.x = startingPoint.x + (i * (spacing.x + 2 * buttonRadius.x));
            newStartingPoint.y = startingPoint.y + offset;

        }
        makeColumn(paper, newStartingPoint, height, spacing.y, buttonColor, buttonShape, buttonRadius, buttonRotation, modFunctions);
    }
}

function makeRowGrid(paper, startingPoint, width, height, spacing, offset, buttonColor, buttonShape, buttonRadius, buttonRotation, modFunctions) {
    // example:  makeOffsetGrid(paper, {x:50, y:50}, 3, 5, {x: 20, y:10}, 2, '#AA0000', 'circle', {x:50, y:50}, 0, modFunctions);
    for (var i = 0; i < height; i++) {
        if (i % 2 == 0) {
            var newStartingPoint = {};
            newStartingPoint.x = startingPoint.x;
            newStartingPoint.y = startingPoint.y + (i * (spacing.y + 2 * buttonRadius.y));
        } else {
            var newStartingPoint = {};
            newStartingPoint.x = startingPoint.x + offset;
            newStartingPoint.y = startingPoint.y + (i * (spacing.y + 2 * buttonRadius.y));

        }
        makeRow(paper, newStartingPoint, width, spacing.y, buttonColor, buttonShape, buttonRadius, buttonRotation, modFunctions);
    }
}

function makeCircle(paper, startingPoint, radius, numberOfButtons, buttonColor, buttonShape, buttonRadius, buttonRotation, modFunctions) {
    // example: makeCircle(paper, {x:400, y:400}, 200, 10, '#AA0000', 'rectangle', {x:10, y:10}, 0, modFunctions);
    var angle = (2 * Math.PI) / numberOfButtons;
    for (var i = 0; i < numberOfButtons; i++) {
            var x = radius * Math.cos(i * angle) + startingPoint.x;
            var y = radius * Math.sin(i * angle) + startingPoint.y;
            var location = {x: x, y: y};
            makeButton(paper, location, buttonColor, buttonShape, buttonRadius, buttonRotation, modFunctions, i);
    } 
}

function makeRadial(paper, startingPoint, startingRotation, numberOfRadials, length, spacing, buttonColor, buttonShape, buttonRadius, buttonRotation, modFunctions) {
    // example:  makeRadial(paper, {x:400, y:200}, Math.PI, 5, 5, 55, '#AA0000', 'circle', {x:25, y:25}, 0, modFunctions);
    makeButton(paper, startingPoint, buttonColor, buttonShape, buttonRadius, buttonRotation, modFunctions, i);
    var angle = (2 * Math.PI) / numberOfRadials;
    for (var i = 0; i < numberOfRadials; i++) {
            var newStartingPoint = {};
            var newAngle = angle * i + startingRotation;
            newStartingPoint.x = Math.floor(Math.cos(newAngle) * (spacing + 2 * buttonRadius.x)) + startingPoint.x;
            newStartingPoint.y = Math.floor(Math.sin(newAngle) * (spacing + 2 * buttonRadius.y)) + startingPoint.y;
            makeLine(paper, newStartingPoint, length - 1, spacing, newAngle, buttonColor, buttonShape, buttonRadius, buttonRotation, modFunctions);
    } 
}


function makePiano(paper, startingPoint, spacing, buttonColor, buttonShape, buttonRadius, buttonRotation, modFunctions, verticalSpacingRatio) {
    // 7
    makeLine(paper, startingPoint, 7, spacing, 0, buttonColor, buttonShape, buttonRadius, buttonRotation, modFunctions)
    // 2
    var newStartingPoint = {x: startingPoint.x + buttonRadius.x + (spacing / 2), y: startingPoint.y - 2 * buttonRadius.y * verticalSpacingRatio}
    makeLine(paper, newStartingPoint, 2, spacing, 0, buttonColor, buttonShape, buttonRadius, buttonRotation, modFunctions)
    // 3
    var newStartingPoint = {x: startingPoint.x + 7 * (buttonRadius.x + (spacing / 2)), y: startingPoint.y - 2 * buttonRadius.y * verticalSpacingRatio}
    makeLine(paper, newStartingPoint, 3, spacing, 0, buttonColor, buttonShape, buttonRadius, buttonRotation, modFunctions)
}

function makeBigPiano(paper, startingPoint, spacing, buttonColor, buttonShape, buttonRadius, buttonRotation, modFunctions, verticalSpacingRatio) {
    makePiano(paper, startingPoint, spacing, buttonColor, buttonShape, buttonRadius, buttonRotation, modFunctions, verticalSpacingRatio)

    var newStartingPoint = {x: startingPoint.x + 14 * (buttonRadius.x + (spacing / 2)), y: startingPoint.y}
    makePiano(paper, newStartingPoint, spacing, buttonColor, buttonShape, buttonRadius, buttonRotation, modFunctions, verticalSpacingRatio)

}


function makeXylophone(paper, startingPoint, numberOfButtons, spacing, buttonColor, buttonShape, buttonRadius, buttonRotation, modFunctions, useSize) {
    // The number of buttons is always greater than 7.  
    // Let us call it more than 7 but less than 15
    function xyloSize(index) {
        var averageRadius = (buttonRadius.x + buttonRadius.y / 2);
        return Math.floor((numberOfButtons - index) * averageRadius / 7);
    }
    if (useSize == true) {
        modFunctions.radius = xyloSize;
    }
    makeLine(paper, startingPoint, numberOfButtons, spacing, 0, buttonColor, buttonShape, buttonRadius, buttonRotation, modFunctions);
}

function makeKalimba(paper, startingPoint, numberOfButtons, spacing, buttonColor, buttonShape, buttonRadius, buttonRotation, modFunctions) {
    // The number of buttons is always greater than 7.  
    // Let us call it more than 7 but less than 15
    function kalimbaSize(index) {
        var averageRadius = (buttonRadius.x + buttonRadius.y / 2);
        if (index <= numberOfButtons / 2) {
            sizeIndex = index;
        } else {
            sizeIndex = numberOfButtons - index;
        }
        return Math.floor(sizeIndex * averageRadius / 7);
    }
    modFunctions.radius = kalimbaSize;
    makeLine(paper, startingPoint, numberOfButtons, spacing, 0, buttonColor, buttonShape, buttonRadius, buttonRotation, modFunctions);
}

function makePianoRoll(paper, startingPoint, spacing, buttonColor, buttonShape, buttonRadius, buttonRotation, modFunctions, horizontalSpacingRatio) {
    // 7
    makeColumn(paper, startingPoint, 7, spacing, buttonColor, buttonShape, buttonRadius, buttonRotation, modFunctions);
    // 3
    var newStartingPoint = {
        x: startingPoint.x - (2 * buttonRadius.x * horizontalSpacingRatio),
        y: startingPoint.y + buttonRadius.y + (spacing / 2), 
    }
    makeColumn(paper, newStartingPoint, 3, spacing, buttonColor, buttonShape, buttonRadius, buttonRotation, modFunctions);
    // 2
    var newStartingPoint = {
        x: startingPoint.x - (2 * buttonRadius.x * horizontalSpacingRatio),
        y: startingPoint.y + (9 * (buttonRadius.y + (spacing / 2))), 
    }
    makeColumn(paper, newStartingPoint, 2, spacing, buttonColor, buttonShape, buttonRadius, buttonRotation, modFunctions);

}

function makeDulcimer(paper, startingPoint, numberOfButtons, spacing, buttonColor, buttonShape, buttonRadius, buttonRotation, modFunctions, alignment, sizeIncrease) {
    // The number of buttons is always greater than 5.  
    // Alignment is a string:  left, center, or right, that defines to the justification of the buttons
    
    // Change size
    var averageRadius = (buttonRadius.x + buttonRadius.y / 2);
    function dulcimerSize(index) {
        if (sizeIncrease == 1) {
            return Math.floor((index + 1) * averageRadius / 7);
        } else if (sizeIncrease == -1) {
            return Math.floor((numberOfButtons - index + 1) * averageRadius / 7);
        }
    }
    modFunctions.radius = dulcimerSize;

    // Functions for computing the alignment delta
    function alignRight(index) {
            return Math.floor((numberOfButtons - index) * averageRadius / 7);
    }
    function alignLeft(index) {
            return -1 * Math.floor((numberOfButtons - index) * averageRadius / 7);
    }

    if (alignment == 'right') {
        modFunctions.xLocation = alignRight;
    }
        if (alignment == 'left') {
        modFunctions.xLocation = alignLeft;
    }
    makeColumn(paper, startingPoint, numberOfButtons, spacing, buttonColor, buttonShape, buttonRadius, buttonRotation, modFunctions);
}