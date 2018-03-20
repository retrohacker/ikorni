# ikorni

[![Greenkeeper badge](https://badges.greenkeeper.io/retrohacker/ikorni.svg)](https://greenkeeper.io/)

> [ikorni](https://en.wiktionary.org/wiki/%C3%ADkorni)

A wrapper for [acorn](https://ghub.io/acorn) allowing for easy mutation of Node
values.

## Installation

```text
npm install --save ikorni
```

## Usage

```js
var ikorni = require('./index.js');
var ast = ikorni.parse('var x = 0;');
ast.replace(ast.body[0].declarations[0].id, 'y');
console.log(ast.generate);
```

```
var y = 0;
```

## API

### `var ast = ikorni.parse(source, opts)`

Same as
[`acorn.parse(input, opts)`](https://github.com/acornjs/acorn#main-parser)

### `ast.replace(node, value)`

Update the source code representing the provided `node` in the AST with
`value`.

A few notes:
  * Strings must include quotes, example: `ast.replace(node, '\'foo.js\'')`.
  * `node` will be left unchanged. If you need to update the AST with your
    changes, you will need to generate the new source and re-parse.

### `var source = ast.generate()`

Returns a new source file updated with everything that has been mutated with
`ast.replace`.
