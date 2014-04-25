#!/usr/bin/env node

/* Script for dumping data out for machine-learning

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
    makeColumnGrid(paper, {x:75, y:250}, 3, 3, {x:50, y:50}, 0, '#000000', 'square', {x:50, y:50}, 0, {});
    dumpDifferences();
    makeColumnGrid(paper, {x:350, y:300}, 3, 2, {x:50, y:50}, 0, '#FFFFFF', 'pentagon', {x:10, y:10}, 0, {});
    dumpDifferences();
    makeColumnGrid(paper, {x:75, y:75}, 4, 1, {x:45, y:20}, 0, '#CCDDEE', 'hexagon', {x:50, y:50}, Math.PI / 4, {});
    dumpDifferences();
    makeColumnGrid(paper, {x:125, y:250}, 2, 4, {x:15, y:50}, 0, '#BB3434', 'octagon', {x:50, y:50}, Math.PI / 7, {});
    dumpDifferences();
    makeColumnGrid(paper, {x:125, y:250}, 3, 4, {x:10, y:75}, 20, '#123412', 'circle', {x:5, y:5}, Math.PI / 2, {});
    dumpDifferences();
    makeColumnGrid(paper, {x:125, y:400}, 3, 3, {x:50, y:5}, 100, '#AA00BB', 'rectangle', {x:50, y:15}, 0, {});
    dumpDifferences();
    makeColumnGrid(paper, {x:100, y:100}, 4, 2, {x:20, y:20}, 0, '#00BB11', 'rectangle', {x:30, y:60}, 0, {});
    dumpDifferences();
    makeColumnGrid(paper, {x:100, y:300}, 2, 2, {x:100, y:100}, 50, '#FFEE00', 'rectangle', {x:50, y:75}, 0, modFunctions);
    dumpDifferences();
    makeColumnGrid(paper, {x:250, y:175}, 3, 3, {x:60, y:20}, 10, '#00BB11', 'triangle', {x:0, y:5}, 0, modFunctions);
    dumpDifferences();
    makeColumnGrid(paper, {x:250, y:375}, 1, 5, {x:15, y:15}, 10, '#CCBB11', 'square', {x:0, y:5}, 0, modFunctions);
    dumpDifferences();
}


