import {getSchema} from "../schema";

describe('schema', () => {
    test('should get map', () => {
        const actual = getSchema([
            'message', 'ProtoMessage',
            '{', 'map',
            '<', 'string',
            ',',
            'string', '>',
            'item', '=',
            '1', ';',
            '}'
        ]);

        const expected = {
            type: 'map',
            map: {from: 'string', to: 'string'},
            name: 'item',
            optional: false,
            options: {},
            repeated: false,
            required: false,
            tag: 1,
        };

        expect(actual.messages[0].fields[0]).toEqual(expected);
    });

    test('should get map with comment in from', () => {
        const actual = getSchema([
            'message', 'ProtoMessage',
            '{', 'map',
            '<', 'string',
            '/*', ' ProtoType ', '*/', ',',
            'string', '>',
            'item', '=',
            '1', ';',
            '}'
        ]);

        const expected = {
            type: 'map',
            map: {from: 'string', fromComment: 'ProtoType', to: 'string'},
            name: 'item',
            optional: false,
            options: {},
            repeated: false,
            required: false,
            tag: 1,
        };

        expect(actual.messages[0].fields[0]).toEqual(expected);
    });

    test('should get map with comment in to', () => {
        const actual = getSchema([
            'message', 'ProtoMessage',
            '{', 'map',
            '<', 'string',
            ',',
            'string',
            '/*', ' ProtoType ', '*/',
            '>',
            'item', '=',
            '1', ';',
            '}'
        ]);

        const expected = {
            type: 'map',
            map: {from: 'string', to: 'string', toComment: 'ProtoType'},
            name: 'item',
            optional: false,
            options: {},
            repeated: false,
            required: false,
            tag: 1,
        };

        expect(actual.messages[0].fields[0]).toEqual(expected);
    });
});
