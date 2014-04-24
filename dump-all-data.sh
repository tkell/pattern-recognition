#!/usr/bin/env bash

echo "Running piano..."
node dump-data.js piano > piano.json
mv piano.json /home/thor/Code/pattern-recognition-server/example_data/

echo "Running small-grid..."
node dump-data.js small-grid > small_grid.json
mv small_grid.json /home/thor/Code/pattern-recognition-server/example_data/

echo "Done!"