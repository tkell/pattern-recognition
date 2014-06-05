#!/usr/bin/env node

/* 
Script for dumping data out for machine-learning
*/

// Dummy variables
var paper = 'fake-paper';
var buttonData = [];
var allButtonData = [];

// Terrible hack to include external files
var fs = require('fs');
eval(fs.readFileSync('shapes.js')+'');
eval(fs.readFileSync('buttons.js')+'');
eval(fs.readFileSync('layouts.js')+'');
eval(fs.readFileSync('mod-functions.js')+'');

// Read command-line input
var layoutType = process.argv[2];

// Helper to organize the button data
function appendData() {
    allButtonData.push(buttonData);
    buttonData = [];
}

// Helper to organize the button data
function writeData() {
    console.log(JSON.stringify(allButtonData));
    buttonData = [];
    allButtonData = []; 
}


if (layoutType == 'piano') {
    eval(fs.readFileSync('training-data/piano-data.js')+'');
} 

if (layoutType == 'small-grid') {
    eval(fs.readFileSync('training-data/small-grid-data.js')+'');
}

if (layoutType == 'xylophone') {
    eval(fs.readFileSync('training-data/xylophone-data.js')+'');
}

if (layoutType == 'piano-roll') {
eval(fs.readFileSync('training-data/piano-roll-data.js')+'');
}

if (layoutType == 'zither') {
    eval(fs.readFileSync('training-data/zither-data.js')+'');
}

if (layoutType == 'circle') {
    eval(fs.readFileSync('training-data/circle-data.js')+'');
}

if (layoutType == 'large-grid') {
    makeColumnGrid(paper, {x:25, y:25}, 5, 5, {x:5, y:5}, 0, '#AA0000', 'circle', {x:10, y:10}, 0, {});
    appendData();
    makeColumnGrid(paper, {x:150, y:25}, 5, 6, {x:10, y:0}, 0, '#123456', 'triangle', {x:15, y:15}, Math.PI / 2, {});
    appendData();
    makeColumnGrid(paper, {x:300, y:25}, 6, 5, {x:10, y:15}, 0, '#FFFF00', 'square', {x:5, y:5}, 0, {});
    appendData();
    makeColumnGrid(paper, {x:225, y:25}, 6, 6, {x:20, y:7}, 0, '#00BB45', 'pentagon', {x:25, y:25}, Math.PI / 5, {});
    appendData();
    makeColumnGrid(paper, {x:20, y:200}, 7, 6, {x:5, y:10}, 0, '#197723', 'hexagon', {x:10, y:10}, 0, {});
    appendData();
    makeColumnGrid(paper, {x:175, y:200}, 6, 7, {x:20, y:0}, 0, '#000000', 'octagon', {x:15, y:15}, Math.PI / 2, {});
    appendData();
    makeColumnGrid(paper, {x:200, y:200}, 7, 7, {x:50, y:5}, 0, '#BBA016', 'rectangle', {x:5, y:15}, 0, {});
    appendData();
    makeColumnGrid(paper, {x:315, y:200}, 5, 5, {x:2, y:27}, 0, '#FFFFFF', 'rectangle', {x:25, y:10}, Math.PI / 5, {});
    appendData();
    makeColumnGrid(paper, {x:55, y:350}, 6, 6, {x:15, y:60}, 0, '#CCCCCC', 'triangle', {x:11, y:19}, 0, {});
    appendData();
    makeColumnGrid(paper, {x:145, y:350}, 7, 6, {x:30, y:30}, 0, '#455453', 'square', {x:15, y:15}, Math.PI / 2, modFunctions);
    appendData();
    makeColumnGrid(paper, {x:275, y:350}, 7, 7, {x:0, y:0}, 0, '#ABCCBA', 'rectangle', {x:25, y:35}, 0, pianoModFunctions);
    appendData();
    makeColumnGrid(paper, {x:385, y:350}, 7, 6, {x:20, y:20}, 0, '#120021', 'circle', {x:7, y:10}, Math.PI / 5, {});
    appendData();
    writeData();
}

if (layoutType == 'big-piano') {
    makeBigPiano(paper, {x:50, y:200}, 20, '#AA0000', 'circle', {x:50, y:50}, 0, {}, 1);
    appendData();
    makeBigPiano(paper, {x:600, y:350}, 5, '#AABB11', 'square', {x:5, y:5}, 0, {}, 1);
    appendData();
    makeBigPiano(paper, {x:100, y:575}, 10, '#000000', 'pentagon', {x:60, y:60}, Math.PI, {}, 1);
    appendData();
    makeBigPiano(paper, {x:200, y:700}, 100, '#FFFFFF', 'hexagon', {x:15, y:15}, Math.PI / 24, {}, 1);
    appendData();
    makeBigPiano(paper, {x:400, y:100}, 15, '#00CC00', 'octagon', {x:25, y:25}, Math.PI / 7, {}, 0.9);
    appendData();
    makeBigPiano(paper, {x:150, y:250}, 0, '#001177', 'triangle', {x:35, y:35}, 0, {}, 0.3);
    appendData();
    makeBigPiano(paper, {x:110, y:500}, 24, '#CCCCCC', 'rectangle', {x:10, y:50}, 0, {}, 0.7);
    appendData();
    makeBigPiano(paper, {x:225, y:725}, 3, '#EE8811', 'rectangle', {x:50, y:10}, 0, {}, 1);
    appendData();
    makeBigPiano(paper, {x:75, y:150}, 60, '#45FC99', 'triangle', {x:5, y:5}, 0, pianoModFunctions, 1);
    appendData();
    makeBigPiano(paper, {x:500, y:300}, 0, '#003399', 'square', {x:15, y:15}, 0, pianoModFunctions, 1);
    appendData();
    makeBigPiano(paper, {x:200, y:525}, 0, '#DC2300', 'rectangle', {x:50, y:100}, 0, pianoModFunctionsNoShape, 1);
    appendData();
    makeBigPiano(paper, {x:200, y:700}, 0, '#007744', 'rectangle', {x:10, y:75}, 0, pianoModFunctionsNoShape, 0.5);
    appendData();
    writeData();
} 

if (layoutType == 'test') {
    // Four test pianos
    makePiano(paper, {x:50, y:200}, 20, '#AA0000', 'circle', {x:50, y:50}, 0, {}, 0.5);
    appendData();
    makePiano(paper, {x:200, y:200}, 66, '#000011', 'rectangle', {x:45, y:25}, Math.PI, {}, 0.1);
    appendData();
    makePiano(paper, {x:75, y:150}, 100, '#45FC99', 'square', {x:5, y:5}, 0, pianoModFunctions, 1);
    appendData();
    makePiano(paper, {x:700, y:56}, 0, '#8849C0', 'circle', {x:100, y:100}, 0, pianoModFunctionsNoShape, 0.5);
    appendData();

    // Four test small grids
    makeColumnGrid(paper, {x:77, y:19}, 1, 4, {x:25, y:80}, 0, '#123456', 'rectangle', {x:10, y:66}, Math.PI / 4, {});
    appendData();
    makeColumnGrid(paper, {x:290, y:600}, 2, 3, {x:10, y:10}, 0, '#ABCDEF', 'pentagon', {x:45, y:45}, Math.PI / 17, {});
    appendData();
    makeColumnGrid(paper, {x:500, y:13}, 3, 4, {x:150, y:150}, 0, '#0965DE', 'hexagon', {x:200, y:200}, 0, pianoModFunctions);
    appendData();
    makeColumnGrid(paper, {x:76, y:350}, 6, 2, {x:5, y:17}, 50, '#34BB81', 'square', {x:34, y:12}, 0, modFunctions);
    appendData();

    // Four test xylophones
    makeXylophone(paper, {x:78, y:45}, 7, 5, '#00FFCC', 'square', {x:10, y:45}, 0, {}, false);
    appendData();
    makeXylophone(paper, {x:234, y:103}, 8, 25, '#183431', 'pentagon', {x:35, y:45}, 0, {}, true);
    appendData();
    makeXylophone(paper, {x:500, y:488}, 21, 90, '#AD0F0F', 'rectangle', {x:65, y:15}, 0, pianoModFunctions, false);
    appendData();
    makeXylophone(paper, {x:19, y:700}, 18, 100, '#999444', 'rectangle', {x:20, y:45}, modFunctions, {}, true);
    appendData();

    // Four test piano rolls
    makePianoRoll(paper, {x: 0, y: 0}, 55, '#00FFCC', 'triangle', {x:5, y:5}, Math.PI / 2.5, {}, 1.0);
    appendData();
    makePianoRoll(paper, {x: 50, y: 734}, 34, '#ABCDEF', 'circle', {x:35, y:35}, 0, pianoModFunctions, 1.0);
    appendData();
    makePianoRoll(paper, {x: 231, y: 111}, 9, '#1866AB', 'rectangle', {x:40, y:5}, Math.PI / 10, {}, 0.3);
    appendData();
    makePianoRoll(paper, {x:700, y:56}, 0, '#AB44F1', 'hexagon', {x:100, y:100}, 0, pianoModFunctionsNoShape, 0.5);
    appendData();

    // Test zithers
    makeZither(paper, {x:0, y:0}, 7, 0, '#AABBCC', 'rectangle',  {x:15, y:38}, 0, modFunctions, 'left');
    appendData();
    makeZither(paper, {x:190, y:56}, 15, 5, '#AABBCC', 'circle',  {x:44, y:44}, 0, {}, 'right');
    appendData();
    makeZither(paper, {x:95, y:205}, 20, 5, '#ABED00', 'triangle',  {x:5, y:5}, 0, {}, 'center');
    appendData();
    makeZither(paper, {x:345, y:220}, 12, 20, '#CBBC11', 'rectangle',  {x:50, y:35}, 0, pianoModFunctionsNoShape, 'center');
    appendData();

    // Test circles
    makeCircle(paper, {x:0, y:400}, 300, 5, '#CBBC11', 'square', {x:75, y:75}, 0, {});
    makeCircle(paper, {x:250, y:400}, 200, 10, '#AA0000', 'circle', {x:10, y:10}, 0, modFunctions);
    makeCircle(paper, {x:400, y:275}, 175, 12, '#FF44AC', 'rectangle', {x:10, y:25}, 0, {});
    makeCircle(paper, {x:400, y:0}, 200, 16, '#113D44', 'hexagon', {x:20, y:20}, 0, modFunctions);

    // Add these back soon!
    // makeColumnGrid(paper, {x:45, y:76}, 5, 5, {x:10, y:20}, 0, '#AA0000', 'circle', {x:50, y:50}, 0, {});
    // makeColumnGrid(paper, {x:80, y:600}, 5, 6, {x:15, y:30}, 0, '#123456', 'triangle', {x:7, y:7}, Math.PI / 2, {});
    // makeColumnGrid(paper, {x:350, y:15}, 7, 5, {x:5, y:45}, 0, '#FFFF00', 'rectangle', {x:15, y:25}, 0, {});
    // makeColumnGrid(paper, {x:100, y:500}, 7, 7, {x:15, y:19}, 0, '#00BB45', 'pentagon', {x:2, y:2}, Math.PI / 5, {});
    

    writeData();
} 