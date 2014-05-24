#!/usr/bin/env python
# -*- coding: utf-8 -*-

'''
Generator for lots and lots and lots of training data
'''

import sys
import random

classification = sys.argv[1]

number_of_things = 1000

if classification == 'piano':
    with open('piano-data.js', 'w') as f:
        for x in range(number_of_things):
            # generate params
            params = {}

            # For the moment, colour, shape, initial location, and button rotation don't matter
            params['color'] = '#000000'
            params['shape'] = 'circle'
            params['x'] = 0
            params['y'] = 0
            params['rotation'] = 0

            # radius does matter, because we're going to add jitter based on it.
            # Likewise, vertical spacing ratio is super important
            # Spacing matters, again because of jitter
            params['radius'] = random.randint(3, 200)
            params['vertical_spacing'] = random.random() * 1.5 + 0.5
            params['spacing'] = random.randint(0, 100)

            # modFunctions can stay as a blank object during testing
            # Jesus.  A jitter of 15 makes everything terrible
            params['mod_function'] = '{}'


            #makePiano(paper, {x:50, y:200}, 20, '#AA0000', 'circle', {x:50, y:50}, 0, {}, 1);
            function_string = 'makePiano(paper, {x:%(x)d, y:%(y)d}, %(spacing)d, "%(color)s", "%(shape)s", {x:%(radius)d, y:%(radius)d}, %(rotation)d, %(mod_function)s, %(vertical_spacing)f);' % params
            f.write(function_string + '\n')
            f.write('appendData();' + '\n')

        f.write('writeData();' + '\n')

if classification == 'xylophone':
    with open('xylophone-data.js', 'w') as f:
        for x in range(number_of_things):
            # generate params
            params = {}

            # For the moment, colour, shape, initial location, and button rotation don't matter
            params['color'] = '#000000'
            params['shape'] = 'circle'
            params['x'] = 0
            params['y'] = 0
            params['rotation'] = 0

            # radius does matter, because we're going to add jitter based on it.
            # Likewise, vertical spacing ratio is super important
            # Spacing matters, again because of jitter
            # Number for sure matters, because of dimensionality.
            # This one only cares about things from 7 to 12 - we'll make another class for 13 - 24, and so on.
            # The useSize toggle matters because that impacts the radius
            params['radius'] = random.randint(3, 200)
            params['spacing'] = random.randint(0, 100)
            params['number']  = random.randint(7, 24)
            if random.randint(0, 1) == 0:
                params['useSize'] = 'false'
            else:
                params['useSize'] = 'true'

            # modFunctions can stay as a blank object during testing
            params['mod_function'] = '{}'

            #makeXylophone(paper, {x:50, y:100}, 7, 25, '#ABCEDF', 'rectangle', {x:50, y:75}, 0, pianoModFunctions, false);
            function_string = 'makeXylophone(paper, {x:%(x)d, y:%(y)d}, %(number)d, %(spacing)d, "%(color)s", "%(shape)s", {x:%(radius)d, y:%(radius)d}, %(rotation)d, %(mod_function)s, %(useSize)s);' % params
            f.write(function_string + '\n')
            f.write('appendData();' + '\n')

        f.write('writeData();' + '\n')


if classification == 'small-grid':
    with open('small-grid-data.js', 'w') as f:
        for x in range(number_of_things):
            # generate params
            params = {}

            # For the moment, colour, shape, initial location, and button rotation don't matter
            params['color'] = '#000000'
            params['shape'] = 'circle'
            params['x'] = 0
            params['y'] = 0
            params['rotation'] = 0

            # radius does matter, because we're going to add jitter based on it.
            # Likewise, vertical spacing ratio is super important
            # Spacing matters, again because of jitter
            # Number for sure matters, because of dimensionality.
            params['radius'] = random.randint(3, 200)
            params['spacing_x'] = random.randint(0, 100)
            params['spacing_y'] = random.randint(0, 100)

            valid_sizes = {1: [4, 5, 6], 
                   2: [3, 4, 5, 6],
                   3: [2, 3, 4],
                   4: [2, 3],
                   5: [1, 2],
                   6: [2],
            }

            params['number_x'] = random.choice([1, 2, 3, 4, 6])
            params['number_y'] = random.choice(valid_sizes[params['number_x']])

            # We're totally ignoring offset for now!
 
            # modFunctions can stay as a blank object during testing
            params['mod_function'] = '{}'

            #makeColumnGrid(paper, {x:400, y:50}, 2, 2, {x:20, y:20}, 0, '#AA0000', 'circle', {x:50, y:50}, 0, {});
            function_string = 'makeColumnGrid(paper, {x:%(x)d, y:%(y)d}, %(number_x)d, %(number_y)d, {x:%(spacing_x)d, y:%(spacing_y)d}, 0, "%(color)s", "%(shape)s", {x:%(radius)d, y:%(radius)d}, %(rotation)d, %(mod_function)s);' % params
            f.write(function_string + '\n')
            f.write('appendData();' + '\n')

        f.write('writeData();' + '\n')


if classification == 'zither':
    with open('zither-data.js', 'w') as f:
        for x in range(number_of_things):
            # generate params
            params = {}

            # For the moment, colour, shape, initial location, and button rotation don't matter
            params['color'] = '#000000'
            params['shape'] = 'circle'
            params['x'] = 0
            params['y'] = 0
            params['rotation'] = 0

            # radius does matter, because we're going to add jitter based on it.
            # Likewise, vertical spacing ratio is super important
            # Spacing matters, again because of jitter
            # Number for sure matters, because of dimensionality.
            # Offset matters because of distance
            params['radius'] = random.randint(3, 200)
            params['spacing'] = random.randint(0, 100)
            params['number']  = random.randint(7, 24)

            params['offset'] = random.choice(['left', 'right', 'center'])
 
            # modFunctions can stay as a blank object during testing
            params['mod_function'] = '{}'

            #makeZither(paper, {x:0, y:0}, 7, 0, '#AABBCC', 'rectangle',  {x:15, y:38}, 0, modFunctions, 'left');
            function_string = 'makeZither(paper, {x:%(x)d, y:%(y)d}, %(number)d, %(spacing)d, "%(color)s", "%(shape)s", {x:%(radius)d, y:%(radius)d}, %(rotation)d, %(mod_function)s, "%(offset)s");' % params
            f.write(function_string + '\n')
            f.write('appendData();' + '\n')

        f.write('writeData();' + '\n')


if classification == 'piano-roll':
    with open('piano-roll-data.js', 'w') as f:
        for x in range(number_of_things):
            # generate params
            params = {}

            # For the moment, colour, shape, initial location, and button rotation don't matter
            params['color'] = '#000000'
            params['shape'] = 'circle'
            params['x'] = 0
            params['y'] = 0
            params['rotation'] = 0

            # radius does matter, because we're going to add jitter based on it.
            # Likewise, vertical spacing ratio is super important
            # Spacing matters, again because of jitter
            params['radius'] = random.randint(3, 200)
            params['horizontal_spacing'] = random.random() * 1.5 + 0.5
            params['spacing'] = random.randint(0, 100)

            # modFunctions can stay as a blank object during testing
            params['mod_function'] = '{}'

            #makePianoRoll(paper, {x: 0, y: 0}, 55, '#00FFCC', 'triangle', {x:5, y:5}, Math.PI / 2.5, {}, 1.0);
            function_string = 'makePianoRoll(paper, {x:%(x)d, y:%(y)d}, %(spacing)d, "%(color)s", "%(shape)s", {x:%(radius)d, y:%(radius)d}, %(rotation)d, %(mod_function)s, %(horizontal_spacing)f);' % params
            f.write(function_string + '\n')
            f.write('appendData();' + '\n')

        f.write('writeData();' + '\n')