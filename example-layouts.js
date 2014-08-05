// Helper functions for drawing various examples on the canvas


// Functions to draw sample layouts.
function drawExamplePiano() {
    makePiano(paper, {x:75, y:200}, 20, '#FEFEFE', 'circle', {x:50, y:50}, 0, {}, 1);
}

function drawExampleXylophone() {
    makeLine(paper, {x: 150, y: 150}, 8, 5, 0, '#0000AA', 'rectangle', {x:40, y:80}, 0, {});
}

function drawExampleZither() {
    makeDulcimer(paper, {x:256, y:100}, 8, -5, '#FFFF11', 'triangle',  {x:25, y:25}, Math.PI / 6, {}, 'right', -1);
}

function drawExampleDulcimer() {
    makeDulcimer(paper, {x:256, y:100}, 8, -5, '#FFFF11', 'triangle',  {x:25, y:25}, Math.PI / 6, {}, 'right', 1);
}

function drawExampleKalimba() {
    makeKalimba(paper, {x: 150, y: 150}, 8, 5, '#00DDAA', 'rectangle', {x:40, y:80}, 0, {});
}


function drawExamplePianoRoll() {
    makePianoRoll(paper, {x: 500, y: 25}, 20, '#CCCCCC', 'diamond', {x:25, y:25}, 0, {}, 0.47);  
}

function drawExampleSmallGrid() {
    makeColumnGrid(paper, {x:450, y:100}, 2, 3, {x: 20, y:10}, 0, '#0900BB', 'hexagon', {x:50, y:50}, 0, {});
}

function drawExampleLargeGrid() {
    makeColumnGrid(paper, {x:100, y:100}, 7, 5, {x: 20, y:10}, 0, '#AA1599', 'octagon', {x:25, y:25}, 0, {});    
}

function drawExampleTonnetz() {
    makeColumnGrid(paper, {x:150, y:100}, 5, 5, {x:25, y:25}, 50, '#DC1344', 'triangle', {x:25, y:25}, Math.PI / 6, {});    
}

function drawExampleBigPiano() {
    makeBigPiano(paper, {x:50, y:200}, 5, '#123456', 'circle', {x:25, y:25}, 0, {}, 1);
}

function drawExampleCircle() {
    makeCircle(paper, {x:250, y:225}, 200, 10, '#00AA10', 'pentagon', {x:25, y:25}, 0, {});
}
