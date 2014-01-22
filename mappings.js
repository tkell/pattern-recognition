
// From http://stackoverflow.com/questions/6913512/how-to-sort-an-array-of-objects-by-multiple-fieldshttp://stackoverflow.com/questions/6913512/how-to-sort-an-array-of-objects-by-multiple-fields
// Going to add an EVAL here, so I can get down to proporties of proporties.  Sigh.  
var sort_by;

(function() {
    // utility functions
    var default_cmp = function(a, b) {
            if (a == b) return 0;
            return a < b ? -1 : 1;
        },
        getCmpFunc = function(primer, reverse) {
            var dfc = default_cmp, // closer in scope
                cmp = default_cmp;
            if (primer) {
                cmp = function(a, b) {
                    return dfc(primer(a), primer(b));
                };
            }
            if (reverse) {
                return function(a, b) {
                    return -1 * cmp(a, b);
                };
            }
            return cmp;
        };

    // actual implementation
    sort_by = function() {
        var fields = [],
            n_fields = arguments.length,
            field, name, reverse, cmp;

        // preprocess sorting options
        for (var i = 0; i < n_fields; i++) {
            field = arguments[i];
            if (typeof field === 'string') {
                name = field;
                cmp = default_cmp;
            }
            else {
                name = field.name;
                cmp = getCmpFunc(field.primer, field.reverse);
            }
            fields.push({
                name: name,
                cmp: cmp
            });
        }

        // final comparison function
        return function(A, B) {
            var a, b, name, result;
            for (var i = 0; i < n_fields; i++) {
                result = 0;
                field = fields[i];
                name = field.name;

                result = field.cmp(eval("A." + name), eval("B." + name));
                if (result !== 0) break;
            }
            return result;
        }
    }
}());



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


function orderFromBottomLeft(buttons) { 
    // Takes an array of buttons, and orders them from the bottom left.  
    // So left-to-right, by row from bottom-to-top.
    return buttons.sort(sort_by({name:'location.y', reverse: true}, {name:'location.x', reverse: false}));
}

function orderByBrightness(buttons) {
    // Takes an array of buttons, and orders them from the bottom left.  
    // So left-to-right, by row from bottom-to-top.
    return buttons.sort(sort_by({name:'brightness', reverse: true}));
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