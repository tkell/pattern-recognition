#!/usr/bin/env python
# -*- coding: utf-8 -*-

'''
Generator for lots and lots and lots of training data
'''

import sys
import random

classification = sys.argv[1]

if classification == 'piano':
    with open('piano-data.js', 'w') as f:
        for x in range(100):
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
            params['mod_function'] = '{}'

            #makePiano(paper, {x:50, y:200}, 20, '#AA0000', 'circle', {x:50, y:50}, 0, {}, 1);
            function_string = 'makePiano(paper, {x:%(x)d, y:%(y)d}, %(spacing)d, "%(color)s", "%(shape)s", {x:%(radius)d, y:%(radius)d}, %(rotation)d, %(mod_function)s, %(vertical_spacing)f);' % params
            f.write(function_string + '\n')