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

    // do the 0th button
    var synth = new Synth({
            context: tsw.context(),
            speakersOn: true
    });
    var mouseDownFunc = partial(betterNoteClick, synth, baseNoteNumber);
    var mouseUpFunc = partial(betterNoteStop, synth, baseNoteNumber);
    buttons[0].button.node.addEventListener('mousedown', mouseDownFunc);
    buttons[0].button.node.addEventListener('mouseup', mouseUpFunc);

    // do the other buttons!
    for (var i = 1; i < buttons.length; i++) {
        var synth = new Synth({
            context: tsw.context(),
            speakersOn: true
        });
        var index = (i - 1) % theScale.length;
        var baseNoteNumber = baseNoteNumber + theScale[index];

        var mouseDownFunc = partial(betterNoteClick, synth, baseNoteNumber);
        var mouseUpFunc = partial(betterNoteStop, synth, baseNoteNumber);
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
        console.log(i, freq);
        var fr = partial(basicNoteClick, audioContext, freq);
        buttons[i].button.click(fr);
    }
}