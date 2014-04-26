#!/usr/bin/env bash

echo "Running piano..."
node dump-data.js piano > piano.json
mv piano.json /home/thor/Code/pattern-recognition-server/example_data/

echo "Running small-grid..."
node dump-data.js small-grid > small_grid.json
mv small_grid.json /home/thor/Code/pattern-recognition-server/example_data/

echo "Running xylophone..."
node dump-data.js xylophone > xylophone.json
mv xylophone.json /home/thor/Code/pattern-recognition-server/example_data/

echo "Running piano-roll..."
node dump-data.js piano-roll > piano_roll.json
mv piano_roll.json /home/thor/Code/pattern-recognition-server/example_data/

echo "Running test data"
node dump-data.js test > test_data.json
mv test_data.json /home/thor/Code/pattern-recognition-server/example_data/

echo "Done!"