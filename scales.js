// Functions to deal with scale and frequencies
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