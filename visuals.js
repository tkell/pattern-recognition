// Functions around drawing things on top of the canvas


// Clear the canvas, clear the button data, and update the UI accordingly
function clearCanvas() {
    paper.clear();
    buttonData = [];
    // Make sure that we remove the click function, and then make it again..
    $('svg').off('click');
    $('svg').click(function(e) {
        createButton(e);
    });
    updatePreview();
}

// Create a button on the canvas
function createButton(e) {
    var location = {'x': e.pageX - offset.x, 'y': e.pageY - offset.y}

    var colorVal = $('#color-input')[0].value;
    var color = colorVal;

    var shapeVal = $('#shape-slider')[0].value;
    var shape = allShapes[shapeVal];

    var radiusVal = parseInt($('#radius-slider')[0].value);
    var radius = {'x': radiusVal, 'y': radiusVal};

    var rotation = 0;
    makeButton(paper, location, color, shape, radius, rotation, {}, 0);
}

function drawConnectingLines() {
    var allLines = [];
    for (var i = 0; i < buttonData.length; i++) {
        var x1 = buttonData[i].location.x;
        var y1= buttonData[i].location.y;

        for (var j = i + 1; j < buttonData.length; j++) {
            var x2 = buttonData[j].location.x;
            var y2= buttonData[j].location.y;

            var line = paper.path( ["M", x1, y1, "L", x2, y2 ] );
            line.attr("stroke", "#00FF33");
            line.attr("opacity", 0);
            allLines.push(line);
        }
    }
    for (var i = 0; i < allLines.length; i++) {
        allLines[i].animate({opacity: 0.95}, 1500, function() {
            this.animate({opacity : 0}, 2500, function() {
                this.remove();})
            ;});
    }
}

function drawAnnotations(returnedButtonData) {
    var allAnnotations = [];
    for (var i = 0; i < returnedButtonData.length; i++) {
        var x = returnedButtonData[i].location.x;
        var y = returnedButtonData[i].location.y;
        
        var midiNum = Math.log(returnedButtonData[i].noteFreq / 440) / Math.LN2 * 12 + 69
        var noteName = midiToNoteName(Math.round(midiNum))

        var t = paper.text(x, y, noteName);

        var mouseDownFunc = partial(betterNoteClick, synth, returnedButtonData[i].noteFreq);
        var mouseUpFunc = partial(betterNoteStop, synth, returnedButtonData[i].noteFreq);

        var drawClick = partial(drawConnectionsFromButton, returnedButtonData[i]);
        t.node.addEventListener('mousedown', drawClick);
        
        t.node.addEventListener('mousedown', mouseDownFunc);
        t.node.addEventListener('mouseup', mouseUpFunc);

        allAnnotations.push(t);
    }   
    for (var i = 0; i < allAnnotations.length; i++) {
        allAnnotations[i].animate({opacity: 0}, 10000, function() {this.remove();});
    }
}

// Workaround for drawing things on top of the actual buttons
function mouseUpStop() {
    synth.stopNote(mostRecentNote);
}

function drawConnectionsFromButton(button) {
    var x1 = button.location.x;
    var y1 = button.location.y;
    var allLines = [];

    for (var i = 0; i < buttonData.length; i++) {
        var x2 = buttonData[i].location.x;
        var y2= buttonData[i].location.y;

        var line = paper.path( ["M", x1, y1, "L", x2, y2 ] );
        line.attr("stroke", "#00FF33");
        line.node.addEventListener('mouseup', mouseUpStop);
        allLines.push(line);
    }

    for (var i = 0; i < allLines.length; i++) {
        allLines[i].animate({opacity: 0}, 500, function() {this.remove()});
    }
}

function applyButtonDrawings() {
    for (var i = 0; i < buttonData.length; i++) {
        var drawClick = partial(drawConnectionsFromButton, buttonData[i]);
        buttonData[i].button.node.addEventListener('mousedown', drawClick);
    }
}