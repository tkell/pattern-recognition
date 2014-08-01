// File with various and sundry synth / mapping functions
var noteNames = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];

function midiToNoteName(midiNumber) {
    var noteName = noteNames[midiNumber % 12];
    var octave = Math.floor(midiNumber / 12) - 2;
    return noteName + octave.toString();
}

// Mouse on / off functions:
function betterNoteClick(synth, note) {
    synth.playNote(note);
    mostRecentNote = note
}

function betterNoteStop(synth, note) {
    synth.stopNote(note);
}

function makeAndMap(theButton, noteFreq) {
        var mouseDownFunc = partial(betterNoteClick, synth, noteFreq);
        var mouseUpFunc = partial(betterNoteStop, synth, noteFreq);
        theButton.button.node.addEventListener('mousedown', mouseDownFunc);
        theButton.button.node.addEventListener('mouseup', mouseUpFunc);
        theButton.button.node.addEventListener('mouseout', mouseUpFunc);
}

// Takes a list of buttonData, with mapping info, and applies it.
// This data will, 9999/10000 times, come from the server
function applyKnownMapping(returnedButtonData) {
    for (var i = 0; i < buttonData.length; i++) {
        // find the match in returnedButtonData, and map it
        for (var j = 0; j < returnedButtonData.length; j++) {
            if (buttonData[i].location.x == returnedButtonData[j].location.x && buttonData[i].location.y == returnedButtonData[j].location.y) {
                makeAndMap(buttonData[i], returnedButtonData[j].noteFreq);
                break;
            }
        }
    }
}