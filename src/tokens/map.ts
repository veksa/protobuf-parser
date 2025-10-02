import {cut} from '../_helpers/cut';
import {isText} from '../validators/isText';

const skipComments = (tokens: string[], index: number): number => {
    let i = index;

    while (i < tokens.length && (tokens[i] === '/*' || tokens[i] === '*/' || tokens[i] === '//')) {
        // Skip comment and the comment content if it's a block comment
        if (tokens[i] === '/*') {
            i++;
            // Skip until we find the closing comment token
            while (i < tokens.length && tokens[i] !== '*/') {
                i++;
            }
            if (i < tokens.length) i++; // Skip the closing '*/' token
        } else if (tokens[i] === '//') {
            i++;
            // Skip until end of line or next token
            while (i < tokens.length && tokens[i] !== '\n') {
                i++;
            }
            if (i < tokens.length) i++; // Skip the newline
        } else {
            i++; // Skip '*/' token if found directly
        }
    }

    return i - index; // Return how many tokens we skipped
}

export const getMap = (tokens: string[]) => {
    let index = 0;
    let keyType = '';
    let valueType = '';
    let fromComment = '';
    let toComment = '';
    let name = '';

    // Verify 'map' token
    if (tokens[index] !== 'map') {
        throw new Error(`Expected 'map' but got '${tokens[index]}'`);
    }
    index++;

    // Skip comments if present
    index += skipComments(tokens, index);

    // Verify '<' token
    if (tokens[index] !== '<') {
        throw new Error(`Expected '<' but got '${tokens[index]}'`);
    }
    index++;

    // Skip comments if present
    index += skipComments(tokens, index);

    // Get key type
    if (!isText(tokens[index])) {
        throw new Error(`Expected key type but got '${tokens[index]}'`);
    }
    keyType = tokens[index];
    index++;

    // Check for comments after key type and before comma
    if (index < tokens.length && tokens[index] === '/*') {
        index++; // Skip '/*'
        // Collect comment content
        while (index < tokens.length && tokens[index] !== '*/') {
            fromComment += tokens[index];
            index++;
        }
        if (index < tokens.length && tokens[index] === '*/') {
            index++; // Skip '*/'
        }
    }

    // Verify ',' token
    if (tokens[index] !== ',') {
        throw new Error(`Expected ',' but got '${tokens[index]}'`);
    }
    index++;

    // Skip regular comments if present
    index += skipComments(tokens, index);

    // Get value type
    if (!isText(tokens[index])) {
        throw new Error(`Expected value type but got '${tokens[index]}'`);
    }
    valueType = tokens[index];
    index++;

    // Check for comments after value type and before closing angle bracket
    if (index < tokens.length && tokens[index] === '/*') {
        index++; // Skip '/*'
        // Collect comment content
        while (index < tokens.length && tokens[index] !== '*/') {
            toComment += tokens[index];
            index++;
        }
        if (index < tokens.length && tokens[index] === '*/') {
            index++; // Skip '*/'
        }
    }

    // Verify '>' token
    if (tokens[index] !== '>') {
        throw new Error(`Expected '>' but got '${tokens[index]}'`);
    }
    index++;

    // Skip comments if present
    index += skipComments(tokens, index);

    // Get field name
    if (!isText(tokens[index])) {
        throw new Error(`Expected field name but got '${tokens[index]}'`);
    }
    name = tokens[index];
    index++;

    // Remove processed tokens
    cut(tokens, index);

    // Build the return object
    const mapObj: any = {
        from: keyType,
        to: valueType,
    };
    
    // Add comments if they exist
    if (fromComment) {
        mapObj.fromComment = fromComment.trim();
    }
    
    if (toComment) {
        mapObj.toComment = toComment.trim();
    }

    return {
        type: 'map',
        map: mapObj,
        name,
    };
};
