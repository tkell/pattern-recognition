// Functions to deal with scale and frequencies
var chromaticScale = [1];
var pentatonicScale = [2, 2, 3, 2, 3];
var diatonicMajorScale = [2, 2, 1, 2, 2, 2, 1];
var diatonicMinorScale = [2, 1, 2, 2, 1, 2, 2];
var diatonicBothScale = [2, 1, 1, 1, 2, 2, 1, 1]; // has flat 3 and flat 7
var trumpetScale = [1, 1, 1];

var scales = {
    'chromatic': chromaticScale,
    'pentatonic':  pentatonicScale,
    'diatonicMajor':  diatonicMajorScale,
    'diatonicMinor':  diatonicMinorScale,
    'diatonicBoth':  diatonicBothScale,
    'trumpet':  trumpetScale,
};


function midiNoteToFrequency(noteNumber) {
    return 440 * Math.pow(2, (noteNumber - 69) / 12)
}