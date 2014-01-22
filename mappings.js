// File with various and sundry mapping functions
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
function orderByBrightness(buttons) {
    // Takes an array of buttons, and orders them by brightness
    return buttons.sort(sort_by({name:'brightness', reverse: true}));
}


// This assumes an ordered list of buttons
function mapScaleOrdered(buttons, baseNoteNumber, scale) {
    var theScale = scales[scale];

    // do the 0th button
    var freq = midiNoteToFrequency(baseNoteNumber)
    var fr = partial(basicNoteClick, audioContext, freq);
    buttonData[0].button.click(fr);

    // do the other buttons!
    for (var i = 1; i < buttons.length; i++) {
        var index = (i - 1) % theScale.length;
        baseNoteNumber = baseNoteNumber + theScale[index];
        var freq = midiNoteToFrequency(baseNoteNumber)
        var fr = partial(basicNoteClick, audioContext, freq);
        buttonData[i].button.click(fr);
    }
}