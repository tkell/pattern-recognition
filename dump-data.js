#!/usr/bin/env node

/* 
Script for dumping data out for machine-learning
*/

// Dummy variables
var paper = 'fake-paper';
var buttonData = [];
var butttonDifferences = {};

// Terrible hack to include external files
var fs = require('fs');
eval(fs.readFileSync('shapes.js')+'');
eval(fs.readFileSync('buttons.js')+'');
eval(fs.readFileSync('layouts.js')+'');
eval(fs.readFileSync('mod-functions.js')+'');

// Read command-line input
var layoutType = process.argv[2];

function clearDifferences() {
    buttonData = [];
    butttonDifferences = {};
}

function dumpDifferences() {
    generateDifferences();
    console.log(JSON.stringify(butttonDifferences));
    clearDifferences();
}

if (layoutType == 'piano') {
    makePiano(paper, {x:50, y:200}, 20, '#AA0000', 'circle', {x:50, y:50}, 0, {}, 1);
    dumpDifferences();
    makePiano(paper, {x:600, y:350}, 5, '#AABB11', 'square', {x:5, y:5}, 0, {}, 1);
    dumpDifferences();
    makePiano(paper, {x:100, y:575}, 10, '#000000', 'pentagon', {x:60, y:60}, Math.PI, {}, 1);
    dumpDifferences();
    makePiano(paper, {x:200, y:700}, 100, '#FFFFFF', 'hexagon', {x:15, y:15}, Math.PI / 24, {}, 1);
    dumpDifferences();
    makePiano(paper, {x:400, y:100}, 15, '#00CC00', 'octagon', {x:25, y:25}, Math.PI / 7, {}, 0.9);
    dumpDifferences();
    makePiano(paper, {x:150, y:250}, 0, '#001177', 'triangle', {x:35, y:35}, 0, {}, 0.3);
    dumpDifferences();
    makePiano(paper, {x:110, y:500}, 24, '#CCCCCC', 'rectangle', {x:10, y:50}, 0, {}, 0.7);
    dumpDifferences();
    makePiano(paper, {x:225, y:725}, 3, '#EE8811', 'rectangle', {x:50, y:10}, 0, {}, 1);
    dumpDifferences();
    makePiano(paper, {x:75, y:150}, 60, '#45FC99', 'triangle', {x:5, y:5}, 0, pianoModFunctions, 1);
    dumpDifferences();
    makePiano(paper, {x:500, y:300}, 0, '#003399', 'square', {x:15, y:15}, 0, pianoModFunctions, 1);
    dumpDifferences();
    makePiano(paper, {x:200, y:525}, 0, '#DC2300', 'rectangle', {x:50, y:100}, 0, pianoModFunctionsNoShape, 1);
    dumpDifferences();
    makePiano(paper, {x:200, y:700}, 0, '#007744', 'rectangle', {x:10, y:75}, 0, pianoModFunctionsNoShape, 0.5);
    dumpDifferences();
} 

if (layoutType == 'small-grid') {
    makeColumnGrid(paper, {x:400, y:50}, 2, 2, {x:20, y:20}, 0, '#AA0000', 'circle', {x:50, y:50}, 0, {});
    dumpDifferences();
    makeColumnGrid(paper, {x:50, y:50}, 1, 4, {x:5, y:5}, 0, '#77FF22', 'triangle', {x:25, y:25}, 0, {});
    dumpDifferences();
    makeColumnGrid(paper, {x:75, y:250}, 2, 3, {x:50, y:50}, 0, '#000000', 'square', {x:50, y:50}, 0, {});
    dumpDifferences();
    makeColumnGrid(paper, {x:350, y:300}, 2, 3, {x:50, y:50}, 0, '#FFFFFF', 'pentagon', {x:10, y:10}, 0, {});
    dumpDifferences();
    makeColumnGrid(paper, {x:75, y:75}, 4, 1, {x:45, y:20}, 0, '#CCDDEE', 'hexagon', {x:50, y:50}, Math.PI / 4, {});
    dumpDifferences();
    makeColumnGrid(paper, {x:125, y:250}, 2, 4, {x:15, y:50}, 0, '#BB3434', 'octagon', {x:50, y:50}, Math.PI / 7, {});
    dumpDifferences();
    makeColumnGrid(paper, {x:125, y:250}, 3, 4, {x:10, y:75}, 20, '#123412', 'circle', {x:5, y:5}, Math.PI / 2, {});
    dumpDifferences();
    makeColumnGrid(paper, {x:125, y:400}, 3, 2, {x:50, y:5}, 100, '#AA00BB', 'rectangle', {x:50, y:15}, 0, {});
    dumpDifferences();
    makeColumnGrid(paper, {x:100, y:100}, 4, 2, {x:20, y:20}, 0, '#00BB11', 'rectangle', {x:30, y:60}, 0, {});
    dumpDifferences();
    makeColumnGrid(paper, {x:200, y:100}, 4, 2, {x:25, y:10}, 0, '#45AACD', 'rectangle', {x:15, y:30}, 0, {});
    dumpDifferences();
    makeColumnGrid(paper, {x:100, y:300}, 2, 2, {x:100, y:100}, 50, '#FFEE00', 'rectangle', {x:50, y:75}, 0, modFunctions);
    dumpDifferences();
    makeColumnGrid(paper, {x:250, y:175}, 2, 3, {x:60, y:20}, 10, '#00BB11', 'triangle', {x:0, y:5}, 0, modFunctions);
    dumpDifferences();
    makeColumnGrid(paper, {x:250, y:375}, 1, 5, {x:15, y:15}, 10, '#CCBB11', 'square', {x:0, y:5}, 0, modFunctions);
    dumpDifferences();
}

if (layoutType == 'xylophone') {
    makeXylophone(paper, {x:50, y:100}, 7, 25, '#ABCEDF', 'rectangle', {x:50, y:75}, 0, pianoModFunctions, false);
    dumpDifferences(); 
    makeXylophone(paper, {x:50, y:200}, 7, 0, '#AA0000', 'square', {x:10, y:45}, 0, {}, false);
    dumpDifferences(); 
    makeXylophone(paper, {x:350, y:300}, 8, 10, '#6734DD', 'rectangle', {x:10, y:45}, 0, {}, false);
    dumpDifferences(); 
    makeXylophone(paper, {x:350, y:450}, 7, 5, '#6734DD', 'rectangle', {x:20, y:45}, 0, {}, true);
    dumpDifferences(); 
    makeXylophone(paper, {x:50, y:450}, 9, 50, '#000000', 'circle', {x:20, y:20}, 0, {}, true);
    dumpDifferences();
    makeXylophone(paper, {x:300, y:600}, 9, 25, '#123456', 'octagon', {x:30, y:30}, 0, {}, true);
    dumpDifferences(); 
    makeXylophone(paper, {x:50, y:100}, 8, 50, '#CCffEE', 'pentagon', {x:50, y:50}, 0, {}, false);
    dumpDifferences(); 
    makeXylophone(paper, {x:125, y:200}, 10, 17, '#FFFFFF', 'hexagon', {x:35, y:45}, 0, {}, false);
    dumpDifferences(); 
    makeXylophone(paper, {x:125, y:450}, 11, 100, '#AA7623', 'triangle', {x:1, y:1}, 0, {}, true);
    dumpDifferences(); 
    makeXylophone(paper, {x:50, y:100}, 10, 50, '#ABCEDF', 'rectangle', {x:25, y:50}, 0, pianoModFunctions, false);
    dumpDifferences(); 
    makeXylophone(paper, {x:125, y:200}, 12, 20, '#FEDCBA', 'hexagon', {x:19, y:45}, 0, pianoModFunctions, false);
    dumpDifferences(); 
    makeXylophone(paper, {x:300, y:600}, 11, 5, '#654321', 'rectangle', {x:10, y:45}, 0, xyloModFunctions, true);
    dumpDifferences();
    makeXylophone(paper, {x:125, y:450}, 13, -5, '#880055', 'triangle', {x:7, y:7}, 0, xyloModFunctions, true);
    dumpDifferences();
}

if (layoutType == 'piano-roll') {
    makePianoRoll(paper, {x: 150, y: 100}, 10, '#AA0000', 'circle', {x:20, y:20}, 0, {}, 1.0);
    dumpDifferences();
    makePianoRoll(paper, {x: 200, y: 100}, 2, '#000000', 'triangle', {x:5, y:5}, Math.PI / 3, {}, 1.0);
    dumpDifferences();
    makePianoRoll(paper, {x: 400, y: 50}, 15, '#FFFFFF', 'square', {x:50, y:20}, 0, {}, 0.5);
    dumpDifferences();
    makePianoRoll(paper, {x: 300, y: 75}, 25, '#335AA5', 'pentagon', {x:10, y:10}, Math.PI / 7, {}, 0.75);
    dumpDifferences();
    makePianoRoll(paper, {x: 125, y: 200}, 20, '#008833', 'hexagon', {x:35, y:35}, 0, {}, 1.0);
    dumpDifferences();
    makePianoRoll(paper, {x: 215, y: 250}, 50, '#AABBCC', 'octagon', {x:75, y:75}, Math.PI / 5, {}, 0.25);
    dumpDifferences();
    makePianoRoll(paper, {x: 380, y: 200}, 7, '#567567', 'rectangle', {x:20, y:5}, 0, {}, 1.0);
    dumpDifferences();
    makePianoRoll(paper, {x: 324, y: 225}, 30, '#0A0B0C', 'rectangle', {x:10, y:40}, 0, {}, 0.47);
    dumpDifferences();
    makePianoRoll(paper, {x: 115, y: 300}, 35, '#993411', 'square', {x:25, y:25}, 0, {}, 0.1);
    dumpDifferences();
    makePianoRoll(paper, {x: 190, y: 350}, 90, '#CCCCCC', 'pentagon', {x:5, y:5}, Math.PI / 17, {}, 0.25);
    dumpDifferences();
    makePianoRoll(paper, {x: 410, y: 300}, 15, '#77A311', 'triangle', {x:15, y:15}, Math.PI / 4, {}, 1.0);
    dumpDifferences();
    makePianoRoll(paper, {x: 305, y: 325}, 20, '#190023', 'rectangle', {x:25, y:25}, 0, {}, 1.0);
}

if (layoutType == 'zither') {
    makeZither(paper, {x:50, y:50}, 7, 15, '#AA0000', 'circle',  {x:10, y:10}, 0, {}, 'center');
    dumpDifferences();
    makeZither(paper, {x:60, y:100}, 7, 10, '#AA0000', 'circle',  {x:15, y:15}, 0, {}, 'center');
    dumpDifferences();
    makeZither(paper, {x:150, y:50}, 8, 20, '#000000', 'triangle',  {x:20, y:20}, 0, {}, 'right');
    dumpDifferences();
    makeZither(paper, {x:250, y:50}, 7, 35, '#FFFFFF', 'square',  {x:35, y:35}, 0, {}, 'left');
    dumpDifferences();
    makeZither(paper, {x:300, y:50}, 8, 50, '#123456', 'pentagon',  {x:45, y:45}, Math.PI / 3, {}, 'center');
    dumpDifferences();
    makeZither(paper, {x:150, y:100}, 7, 20, '#00BB11', 'hexagon',  {x:15, y:15}, 0, {}, 'left');
    dumpDifferences();
    makeZither(paper, {x:250, y:200}, 8, 35, '#997132', 'octagon',  {x:22, y:22}, Math.PI / 7, modFunctions, 'right');
    dumpDifferences();
    makeZither(paper, {x:60, y:35}, 7, 15, '#18745AC', 'rectangle',  {x:10, y:50}, 0, {}, 'center');
    dumpDifferences();
    makeZither(paper, {x:145, y:78}, 8, 25, '#909090', 'rectangle',  {x:50, y:20}, 0, {}, 'right');
    dumpDifferences();
    makeZither(paper, {x:222, y:45}, 7, 22, '#00FFEE', 'rectangle',  {x:16, y:14}, 0, modFunctions, 'left');
    dumpDifferences();
    makeZither(paper, {x:367, y:100}, 8, 33, '#5423CC', 'pentagon',  {x:45, y:45}, 0, modFunctions, 'center');
    dumpDifferences();
    makeZither(paper, {x:120, y:350}, 7, 14, '#193333', 'circle',  {x:15, y:15}, 0, {}, 'right');
    dumpDifferences();
    makeZither(paper, {x:275, y:254}, 8, 5, '#23521A', 'triangle',  {x:5, y:5}, 0, {}, 'left');
    dumpDifferences();
}

if (layoutType == 'large-grid') {
    makeColumnGrid(paper, {x:25, y:25}, 5, 5, {x:5, y:5}, 0, '#AA0000', 'circle', {x:10, y:10}, 0, {});
    dumpDifferences();
    makeColumnGrid(paper, {x:150, y:25}, 5, 7, {x:10, y:0}, 0, '#123456', 'triangle', {x:15, y:15}, Math.PI / 2, {});
    dumpDifferences();
    makeColumnGrid(paper, {x:300, y:25}, 8, 6, {x:10, y:15}, 0, '#FFFF00', 'square', {x:5, y:5}, 0, {});
    dumpDifferences();
    makeColumnGrid(paper, {x:225, y:25}, 7, 7, {x:20, y:7}, 0, '#00BB45', 'pentagon', {x:25, y:25}, Math.PI / 5, {});
    dumpDifferences();
    makeColumnGrid(paper, {x:20, y:200}, 5, 6, {x:5, y:10}, 0, '#197723', 'hexagon', {x:10, y:10}, 0, {});
    dumpDifferences();
    makeColumnGrid(paper, {x:175, y:200}, 9, 9, {x:20, y:0}, 0, '#000000', 'octagon', {x:15, y:15}, Math.PI / 2, {});
    dumpDifferences();
    makeColumnGrid(paper, {x:200, y:200}, 8, 7, {x:50, y:5}, 0, '#BBA016', 'rectangle', {x:5, y:15}, 0, {});
    dumpDifferences();
    makeColumnGrid(paper, {x:315, y:200}, 7, 9, {x:2, y:27}, 0, '#FFFFFF', 'rectangle', {x:25, y:10}, Math.PI / 5, {});
    dumpDifferences();
    makeColumnGrid(paper, {x:55, y:350}, 9, 6, {x:15, y:60}, 0, '#CCCCCC', 'triangle', {x:11, y:19}, 0, {});
    dumpDifferences();
    makeColumnGrid(paper, {x:145, y:350}, 9, 8, {x:30, y:30}, 0, '#455453', 'square', {x:15, y:15}, Math.PI / 2, modFunctions);
    dumpDifferences();
    makeColumnGrid(paper, {x:275, y:350}, 8, 8, {x:0, y:0}, 0, '#ABCCBA', 'rectangle', {x:25, y:35}, 0, pianoModFunctions);
    dumpDifferences();
    makeColumnGrid(paper, {x:385, y:350}, 7, 6, {x:20, y:20}, 0, '#120021', 'circle', {x:7, y:10}, Math.PI / 5, {});
    dumpDifferences();
}

if (layoutType == 'test') {
    // Four test pianos
    makePiano(paper, {x:50, y:200}, 20, '#AA0000', 'circle', {x:50, y:50}, 0, {}, 0.5);
    dumpDifferences();
    makePiano(paper, {x:200, y:200}, 66, '#000011', 'rectangle', {x:45, y:25}, Math.PI, {}, 0.1);
    dumpDifferences();
    makePiano(paper, {x:75, y:150}, 100, '#45FC99', 'square', {x:5, y:5}, 0, pianoModFunctions, 1);
    dumpDifferences();
    makePiano(paper, {x:700, y:56}, 0, '#8849C0', 'circle', {x:100, y:100}, 0, pianoModFunctionsNoShape, 0.5);
    dumpDifferences();

    // Four test small grids
    makeColumnGrid(paper, {x:77, y:19}, 1, 3, {x:25, y:80}, 0, '#123456', 'rectangle', {x:10, y:66}, Math.PI / 4, {});
    dumpDifferences();
    makeColumnGrid(paper, {x:290, y:600}, 4, 2, {x:10, y:10}, 0, '#ABCDEF', 'pentagon', {x:45, y:45}, Math.PI / 17, {});
    dumpDifferences();
    makeColumnGrid(paper, {x:500, y:13}, 2, 3, {x:150, y:150}, 0, '#0965DE', 'hexagon', {x:200, y:200}, 0, pianoModFunctions);
    dumpDifferences();
    makeColumnGrid(paper, {x:76, y:350}, 4, 1, {x:5, y:17}, 50, '#34BB81', 'square', {x:34, y:12}, 0, modFunctions);
    dumpDifferences();

    // Four test xylophones
    makeXylophone(paper, {x:78, y:45}, 7, 5, '#00FFCC', 'square', {x:10, y:45}, 0, {}, false);
    dumpDifferences();
    makeXylophone(paper, {x:234, y:103}, 10, 25, '#183431', 'pentagon', {x:35, y:45}, 0, {}, true);
    dumpDifferences();
    makeXylophone(paper, {x:500, y:488}, 16, 90, '#AD0F0F', 'rectangle', {x:65, y:15}, 0, pianoModFunctions, false);
    dumpDifferences();
    makeXylophone(paper, {x:19, y:700}, 8, 100, '#999444', 'rectangle', {x:20, y:45}, modFunctions, {}, true);
    dumpDifferences();

    // Four test piano rolls
    makePianoRoll(paper, {x: 0, y: 0}, 55, '#00FFCC', 'triangle', {x:5, y:5}, Math.PI / 2.5, {}, 1.0);
    dumpDifferences();
    makePianoRoll(paper, {x: 50, y: 734}, 34, '#ABCDEF', 'circle', {x:35, y:35}, 0, pianoModFunctions, 1.0);
    dumpDifferences();
    makePianoRoll(paper, {x: 231, y: 111}, 9, '#1866AB', 'rectangle', {x:40, y:5}, Math.PI / 10, {}, 0.3);
    dumpDifferences();
    makePianoRoll(paper, {x:700, y:56}, 0, '#AB44F1', 'hexagon', {x:100, y:100}, 0, pianoModFunctionsNoShape, 0.5);
    dumpDifferences();

    // Test zithers
    makeZither(paper, {x:0, y:0}, 7, 0, '#AABBCC', 'rectangle',  {x:15, y:38}, 0, modFunctions, 'left');
    dumpDifferences();
    makeZither(paper, {x:190, y:56}, 8, 5, '#AABBCC', 'circle',  {x:44, y:44}, 0, {}, 'right');
    dumpDifferences();
    makeZither(paper, {x:95, y:205}, 16, 5, '#ABED00', 'triangele',  {x:5, y:5}, 0, {}, 'center');
    dumpDifferences();
    makeZither(paper, {x:345, y:220}, 12, 20, '#BBC11', 'rectangle',  {x:50, y:35}, 0, pianoModFunctionsNoShape, 'center');
    dumpDifferences();

    // Test large grids
    makeColumnGrid(paper, {x:45, y:76}, 5, 5, {x:10, y:20}, 0, '#AA0000', 'circle', {x:50, y:50}, 0, {});
    dumpDifferences();
    makeColumnGrid(paper, {x:80, y:600}, 5, 6, {x:15, y:30}, 0, '#123456', 'triangle', {x:7, y:7}, Math.PI / 2, {});
    dumpDifferences();
    makeColumnGrid(paper, {x:350, y:15}, 7, 5, {x:5, y:45}, 0, '#FFFF00', 'rectangle', {x:15, y:25}, 0, {});
    dumpDifferences();
    makeColumnGrid(paper, {x:100, y:500}, 8, 8, {x:15, y:19}, 0, '#00BB45', 'pentagon', {x:2, y:2}, Math.PI / 5, {});
    dumpDifferences();
} 