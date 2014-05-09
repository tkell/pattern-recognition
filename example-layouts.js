// Helper functions for drawing various examples on the canvas


// Functions to draw sample layouts.
function drawExamplePiano() {
    makePiano(paper, {x:75, y:200}, 20, '#11BB00', 'circle', {x:50, y:50}, 0, {}, 1);
}

function drawExampleXylophone() {
    makeLine(paper, {x: 50, y: 150}, 8, 5, 0, '#AA0000', 'triangle', {x:25, y:25}, 0, {});
}

function drawExampleZither() {
    makeZither(paper, {x:145, y:25}, 8, 25, '#900FF0', 'rectangle',  {x:25, y:15}, 0, {}, 'right');
}

function drawExamplePianoRoll() {
    makePianoRoll(paper, {x: 500, y: 25}, 15, '#0A0B0C', 'diamond', {x:25, y:25}, 0, {}, 0.47);  
}

function drawExampleSmallGrid() {
    makeColumnGrid(paper, {x:450, y:100}, 2, 3, {x: 20, y:10}, 0, '#0900BB', 'hexagon', {x:50, y:50}, 0, {});
}

function drawExampleLargeGrid() {
    makeColumnGrid(paper, {x:100, y:100}, 7, 5, {x: 20, y:10}, 0, '#AA1599', 'octagon', {x:25, y:25}, 0, {});    
}

function drawExampleBigPiano() {
    makeBigPiano(paper, {x:50, y:400}, 10, '#123456', 'circle', {x:15, y:15}, 0, {}, 1);
}