#!/usr/bin/env python
# -*- coding: utf-8 -*-

'''
Generator for lots and lots and lots of training data
'''

import sys
import random

classification = sys.argv[1]

number_of_things = 500

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

            # radius does matter, because it impacts spacing
            # Likewise, vertical spacing ratio is super important
            # Spacing matters, again because of jitter
            params['radius'] = random.randint(10, 200)
            params['vertical_spacing'] = random.random() * 1.5 + 0.5
            params['spacing'] = random.randint(0, 100)


            # modFunctions can stay as a blank object for pianos, because pianos are too strong.
            params['mod_function'] = {}


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
            # The useSize toggle matters because that impacts the radius
            params['radius'] = random.randint(10, 200)
            params['spacing'] = random.randint(0, 100)
            params['number']  = random.randint(7, 24)
            if random.randint(0, 1) == 0:
                params['useSize'] = 'false'
            else:
                params['useSize'] = 'true'

            mod_function_string = """
            function randomizeIntegerParam(index) {
                return Math.floor(Math.random() * 5);
            }
            """
            # modFunctions with a dash of jitter
            params['mod_function'] = '{"xlocation": %s, "ylocation": %s}' % (mod_function_string, mod_function_string)

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
            params['radius'] = random.randint(10, 200)
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
            params['radius'] = random.randint(10, 200)
            params['spacing'] = random.randint(0, 100)
            params['number']  = random.randint(7, 24)

            params['offset'] = random.choice(['left', 'right', 'center'])
 
            mod_function_string = """
            function randomizeIntegerParam(index) {
                return Math.floor(Math.random() * 5);
            }
            """
            # modFunctions with a dash of jitter
            params['mod_function'] = '{"xlocation": %s, "ylocation": %s}' % (mod_function_string, mod_function_string)

            #makeDulcimer(paper, {x:0, y:0}, 7, 0, '#AABBCC', 'rectangle',  {x:15, y:38}, 0, modFunctions, 'left', 1);
            function_string = 'makeDulcimer(paper, {x:%(x)d, y:%(y)d}, %(number)d, %(spacing)d, "%(color)s", "%(shape)s", {x:%(radius)d, y:%(radius)d}, %(rotation)d, %(mod_function)s, "%(offset)s", 1);' % params
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
            params['radius'] = random.randint(10, 200)
            params['horizontal_spacing'] = random.random() * 1.5 + 0.5
            params['spacing'] = random.randint(0, 100)

            # modFunctions can stay as a blank object during testing
            params['mod_function'] = '{}'

            #makePianoRoll(paper, {x: 0, y: 0}, 55, '#00FFCC', 'triangle', {x:5, y:5}, Math.PI / 2.5, {}, 1.0);
            function_string = 'makePianoRoll(paper, {x:%(x)d, y:%(y)d}, %(spacing)d, "%(color)s", "%(shape)s", {x:%(radius)d, y:%(radius)d}, %(rotation)d, %(mod_function)s, %(horizontal_spacing)f);' % params
            f.write(function_string + '\n')
            f.write('appendData();' + '\n')

        f.write('writeData();' + '\n')

if classification == 'circle':
    with open('circle-data.js', 'w') as f:
        for x in range(number_of_things):
             # generate params
            params = {}

            # For the moment, colour, shape, initial location, 
            # and button rotation don't matter.
            params['color'] = '#000000'
            params['shape'] = 'circle'
            params['x'] = 0
            params['y'] = 0
            params['rotation'] = 0 

            # These do matter!
            params['circle_radius'] = random.randint(20, 500)
            params['number_of_buttons'] = random.randint(5, 20)
            params['button_radius'] = random.randint(10, 100)
            
            # modFunctions can stay as a blank object during testing
            params['mod_function'] = '{}'

            # makeCircle(paper, {x:400, y:400}, 200, 10, '#AA0000', 'rectangle', {x:10, y:10}, 0, {});   
            function_string = 'makeCircle(paper, {x:%(x)d, y:%(x)d}, %(circle_radius)d, %(number_of_buttons)d, "%(color)s", "%(shape)s", {x:%(button_radius)d, y:%(button_radius)d}, %(rotation)d, %(mod_function)s);' % params
            f.write(function_string + '\n')
            f.write('appendData();' + '\n')

        f.write('writeData();' + '\n')


if classification == 'large_grid':
    with open('large-grid-data.js', 'w') as f:
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
            params['radius'] = random.randint(10, 200)
            params['spacing_x'] = random.randint(0, 100)
            params['spacing_y'] = random.randint(0, 100)

            valid_sizes = {
                   2: [7, 8, 9], 
                   3: [5, 6, 7, 8],
                   4: [4, 5, 6, 7],
                   5: [3, 4, 5, 6],
                   6: [3, 4, 5, 6],
            }

            params['number_x'] = random.choice([2, 3, 4, 6])
            params['number_y'] = random.choice(valid_sizes[params['number_x']])

            # modFunctions can stay as a blank object during testing
            params['mod_function'] = '{}'

            #makeColumnGrid(paper, {x:400, y:50}, 2, 2, {x:20, y:20}, 0, '#AA0000', 'circle', {x:50, y:50}, 0, {});
            function_string = 'makeColumnGrid(paper, {x:%(x)d, y:%(y)d}, %(number_x)d, %(number_y)d, {x:%(spacing_x)d, y:%(spacing_y)d}, 0, "%(color)s", "%(shape)s", {x:%(radius)d, y:%(radius)d}, %(rotation)d, %(mod_function)s);' % params
            f.write(function_string + '\n')
            f.write('appendData();' + '\n')

        f.write('writeData();' + '\n')


if classification == 'tonnetz':
    with open('tonnetz-data.js', 'w') as f:
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
            params['radius'] = random.randint(10, 200)
            params['spacing_x'] = random.randint(0, 100)
            params['spacing_y'] = random.randint(0, 100)

            valid_sizes = {
                   4: [4, 5],
                   5: [4, 5, 6],
                   6: [5, 6, 7],
                   7: [6, 7, 8],
            }

            params['number_x'] = random.choice([4, 5, 6, 7])
            params['number_y'] = random.choice(valid_sizes[params['number_x']])

            # Dun dun dun
            params['offset'] = (params['spacing_y'] + params['radius']) / 2
 
            # modFunctions can stay as a blank object during testing
            params['mod_function'] = '{}'

            #makeColumnGrid(paper, {x:400, y:50}, 2, 2, {x:20, y:20}, 0, '#AA0000', 'circle', {x:50, y:50}, 0, {});
            function_string = 'makeColumnGrid(paper, {x:%(x)d, y:%(y)d}, %(number_x)d, %(number_y)d, {x:%(spacing_x)d, y:%(spacing_y)d}, %(offset)d, "%(color)s", "%(shape)s", {x:%(radius)d, y:%(radius)d}, %(rotation)d, %(mod_function)s);' % params
            f.write(function_string + '\n')
            f.write('appendData();' + '\n')

        f.write('writeData();' + '\n')
