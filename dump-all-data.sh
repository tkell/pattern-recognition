#!/usr/bin/env bash

echo "Changing dir to training data"
cd training-data
echo "Generating piano data"
python generate.py piano
echo "Generating xylophone data"
python generate.py xylophone
echo "Generating small grid data"
python generate.py small-grid
echo "Generating piano-roll data"
python generate.py piano-roll
echo "Generating zither data"
python generate.py zither

echo "Generating circle data"
python generate.py circle

echo "Coming up a directory"
cd ..

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

echo "Running zither..."
node dump-data.js zither > zither.json
mv zither.json /home/thor/Code/pattern-recognition-server/example_data/

echo "Running large-grid..."
node dump-data.js large-grid > large_grid.json
mv large_grid.json /home/thor/Code/pattern-recognition-server/example_data/

echo "Running big-piano..."
node dump-data.js big-piano > big_piano.json
mv big_piano.json /home/thor/Code/pattern-recognition-server/example_data/

echo "Running circle"
node dump-data.js circle > circle.json
mv circle.json /home/thor/Code/pattern-recognition-server/example_data/

echo "Running test data"
node dump-data.js test > test_data.json
mv test_data.json /home/thor/Code/pattern-recognition-server/example_data/

echo "Done creation of data, preparing for rsync to tide-pool.ca"

# This will upload the example data to the tide pool folder
# Changing paths will shatter this!
rsync /home/thor/Code/pattern-recognition-server/example_data/*.json --exclude "test_data.json" tidepool@tide-pool.ca:/home/tidepool/www/pattern-recognition/example-data

echo "Done rsync!"
