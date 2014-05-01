// File with various and sundry mapping functions

// Test function
function mapPitchTest(button) {
    var freq = button.location.x * 2.1828 + button.location.y / 1.618;
    return freq
}


// Ordering functions
function orderFromBottomLeft(buttons) { 
    // Takes an array of buttons, and orders them from the bottom left.  
    // So left-to-right, by row from bottom-to-top.
    return buttons.sort(sort_by({name:'location.y', reverse: true}, {name:'location.x', reverse: false}));
}
function orderFromLeft(buttons) { 
    // Takes an array of buttons, and orders them from the  left.  
    // So left-to-right, regardless of y position.
    // This is my piano / xylophone mapping!
    return buttons.sort(sort_by({name:'location.x', reverse: false}));
}
function orderFromRight(buttons) { 
    // Takes an array of buttons, and orders them from the right.  
    return buttons.sort(sort_by({name:'location.x', reverse: true}));
}
function orderFromTop(buttons) { 
    // Takes an array of buttons, and orders them from the top.  
    return buttons.sort(sort_by({name:'location.y', reverse: false}));
}
function orderFromBottom(buttons) { 
    // Takes an array of buttons, and orders them from the top.  
    return buttons.sort(sort_by({name:'location.y', reverse: true}));
}

function orderByBrightness(buttons) {
    // Takes an array of buttons, and orders them by brightness
    return buttons.sort(sort_by({name:'brightness', reverse: true}));
}


// This assumes an ordered list of buttons
function mapScaleOrdered(buttons, baseNoteNumber, scale) {
    var theScale = scales[scale];
    var noteFreq;

    // do the 0th button
    var synth = new Synth({
            context: tsw.context(),
            speakersOn: true
    });
    noteFreq = midiNoteToFrequency(baseNoteNumber);
    var mouseDownFunc = partial(betterNoteClick, synth, noteFreq);
    var mouseUpFunc = partial(betterNoteStop, synth, noteFreq);
    buttons[0].button.node.addEventListener('mousedown', mouseDownFunc);
    buttons[0].button.node.addEventListener('mouseup', mouseUpFunc);

    // do the other buttons
    var noteNumber = baseNoteNumber;
    for (var i = 1; i < buttons.length; i++) {
        var synth = new Synth({
            context: tsw.context(),
            speakersOn: true
        });
        var index = (i - 1) % theScale.length;
        noteNumber = noteNumber + theScale[index];
        noteFreq = midiNoteToFrequency(noteNumber);

        var mouseDownFunc = partial(betterNoteClick, synth, noteFreq);
        var mouseUpFunc = partial(betterNoteStop, synth, noteFreq);
        buttons[i].button.node.addEventListener('mousedown', mouseDownFunc);
        buttons[i].button.node.addEventListener('mouseup', mouseUpFunc);
    }
}

// we're going to do just distance, and just octaves, for now...
// There's got to be a way to connect this to buttonDifferences, but they're coming in different orders, o
function mapByRatio(buttons, baseNoteNumber) {
    var baseLocation = buttons[0].location;
    var baseFreq = midiNoteToFrequency(baseNoteNumber);

    var maxDistance = 0;
    for (var i = 0; i < buttons.length; i++) {
        var distance = Math.sqrt(Math.pow(buttons[i].location.x - baseLocation.x, 2) + Math.pow(buttons[i].location.y - baseLocation.y, 2));
        if (distance > maxDistance) {
            maxDistance = distance;
        }
    }

    for (var i = 0; i < buttons.length; i++) {
        var distance = Math.sqrt(Math.pow(buttons[i].location.x - baseLocation.x, 2) + Math.pow(buttons[i].location.y - baseLocation.y, 2));
        var ratio = (distance / maxDistance) + 1;
        var freq = ratio * baseFreq;

        var synth = new Synth({
            context: tsw.context(),
            speakersOn: true
        });

        var mouseDownFunc = partial(betterNoteClick, synth, freq);
        var mouseUpFunc = partial(betterNoteStop, synth, freq);
        buttons[i].button.node.addEventListener('mousedown', mouseDownFunc);
        buttons[i].button.node.addEventListener('mouseup', mouseUpFunc);
    }
}


// Notes for small grid mapping
// Small Grid mapping - note that I will need to 
    // talk to my synth a bit to make this work in the main thing.
    // Remember that a lot of these guys need to LOWER the pitch.  
    // I probably also want a 'monophonic / multiphonic' toggle, somewhere in my settings.
    // Which will impact the exact tuning that I return

function mapAsSmallGrid(buttonData) {
    buttonData = orderFromBottomLeft(buttonData);
    if (buttonData.length == 10) {
        mapScaleOrdered(buttonData, 60, 'diatonicBoth');
    }
    if (buttonData.length == 9) {
        mapScaleOrdered(buttonData, 60, 'diatonicBoth');
    }
    if (buttonData.length == 8) {
        mapScaleOrdered(buttonData, 60, 'diatonicMajor');
    }
    if (buttonData.length == 7) {
        mapScaleOrdered(buttonData, 60, 'diatonicMajor');
    }
    if (buttonData.length == 7) {
        mapScaleOrdered(buttonData, 60, 'diatonicMajor');
    }
    if (buttonData.length == 6) {
        mapScaleOrdered(buttonData, 60, 'pentatonic');
    }
    if (buttonData.length == 5) {
        mapScaleOrdered(buttonData, 60, 'pentatonic');
    }
    if (buttonData.length == 4) {
        mapScaleOrdered(buttonData, 60, 'trumpet');
    }
    if (buttonData.length == 3) {
        mapScaleOrdered(buttonData, 60, 'trumpet');
    }
}

function mapAsLargeGrid(buttonData, numCols, numRows) {
    // Note that my classification is going to have to return
    // numRows and numCols, or I will need to work them out from buttonData

    var theScale = '';
    if (numCols == 10) {
        theScale = 'diatonicBoth';
    }
    if (numCols == 9) {
        theScale = 'diatonicBoth';
    }
    if (numCols == 8) {
        theScale = 'diatonicMajor';
    }
    if (numCols == 7) {
        theScale = 'diatonicMajor';
    }
    if (numCols == 6) {
        theScale = 'pentatonic';
    }
    if (numCols == 5) {
        theScale = 'pentatonic';
    }

    buttonData = orderFromBottomLeft(buttonData);
    // Need a scale per row and an interval per-column
    var columnInterval = 5; // Start with P4
    var rowScale = 'pentatonic'
    var baseNoteNumber = 60;

    for (var i = 0; i < numRows; i++) {
        var startingIndex = i * 5;
        var endingIndex = (i + 1) * 5;
        var noteNumber = baseNoteNumber + i * columnInterval;

        mapScaleOrdered(buttonData.slice(startingIndex, endingIndex), noteNumber, theScale);
    }
}