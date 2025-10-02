import {getSchema} from "../schema";

describe('schema', () => {
    test('should get map with comments', () => {
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

        const expected = 1;

        expect(actual).toEqual(expected);
    })
});
