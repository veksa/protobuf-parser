# @veksa/protobuf-parser

[![npm version](https://img.shields.io/npm/v/@veksa/protobuf-parser.svg?style=flat-square)](https://www.npmjs.com/package/@veksa/protobuf-parser)
[![npm downloads](https://img.shields.io/npm/dm/@veksa/protobuf-parser.svg?style=flat-square)](https://www.npmjs.com/package/@veksa/protobuf-parser)
[![license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](LICENSE.md)

A lightweight Protocol Buffers (protobuf) parser for JavaScript and TypeScript applications. This library parses protobuf definition files (.proto) into a structured JavaScript object representation, making it easier to work with Protocol Buffers in your JavaScript/TypeScript projects.

## Features

- Parse Protocol Buffer (.proto) files into JavaScript objects
- Support for Protocol Buffers syntax 3
- TypeScript type definitions included
- Handles messages, enums, services, options, and more
- Proper error handling with line and column information
- Zero runtime dependencies (only requires [@veksa/protobuf-tokenizer](https://www.npmjs.com/package/@veksa/protobuf-tokenizer))

## Installation

@veksa/protobuf-parser requires **TypeScript 5.8 or later**.

### Using npm or yarn

```bash
# npm
npm install @veksa/protobuf-parser

# yarn
yarn add @veksa/protobuf-parser
```

## Usage

```typescript
import { parse } from '@veksa/protobuf-parser';
import fs from 'fs';

// Parse from a string
const protoDefinition = `
syntax = "proto3";

package example;

message Person {
  string name = 1;
  int32 id = 2;
  string email = 3;
}
`;

const schema = parse(protoDefinition);
console.log(schema);

// Or parse from a file
const fileContent = fs.readFileSync('example.proto');
const schemaFromFile = parse(fileContent);
console.log(schemaFromFile);
```

## API

### `parse(content: string | Buffer): Schema`

Parses the Protocol Buffer definition from a string or Buffer and returns a structured Schema object.

### Schema Structure

The parser generates a Schema object with the following structure:

```typescript
interface Schema {
  syntax: number; // Protocol buffer syntax version (3)
  package?: string; // Package name if defined
  imports: string[]; // Imported proto files
  enums: Enum[]; // Enums defined at the root level
  messages: Message[]; // Messages defined at the root level
  options: Options; // Options defined at the root level
  extends: Extend[]; // Extensions defined at the root level
  services: Service[]; // Services defined at the root level
  comment?: string; // Comment associated with the schema
}
```

For more details on the returned structure, refer to the TypeScript type definitions in the source code.

## License

[MIT](LICENSE.md)
