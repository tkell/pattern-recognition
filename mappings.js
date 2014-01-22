// File with various and sundry mapping functions


var chromaticScale = [1];
var pentatonicScale = [2, 2, 3, 2, 3];
var diatonicMajorScale = [2, 2, 1, 2, 2, 2, 1];
var diatonicMinorScale = [2, 1, 2, 2, 1, 2, 2];

var scales = {
    'chromatic': chromaticScale,
    'pentatonic':  pentatonicScale,
    'diatonicMajor':  diatonicMajorScale,
    'diatonicMinor':  diatonicMinorScale,
};


function midiNoteToFrequency(noteNumber) {
    return 440 * Math.pow(2, (noteNumber - 69) / 12)
}

function mapPitchTest(button) {
    var freq = button.location.x * 2.1828 + button.location.y / 1.618;
    return freq
}


// This assumes an ordered list of buttons
function mapPitchOrdered(buttons, baseNoteNumber, scale) {
    var theScale = scales[scale];

    // do the 0th button
    var freq = midiNoteToFrequency(baseNoteNumber)
    var fr = partial(basicNoteClick, audioContext, freq);
    buttonData[0].button.click(fr);

    // do the other buttons!
    for (var i = 1; i < buttons.length; i++) {
        var index = (i - 1) % theScale.length;
        baseNoteNumber = baseNoteNumber + theScale[index];

        console.log(baseNoteNumber);
        var freq = midiNoteToFrequency(baseNoteNumber)
        var fr = partial(basicNoteClick, audioContext, freq);
        buttonData[i].button.click(fr);
    }
}