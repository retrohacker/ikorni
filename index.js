var acorn = require('acorn')

var ikorni = {
  parse: parse
}

Object.freeze(ikorni)

function parse (source, options) {
  var ast = acorn.parse(source, options)
  var chunks = source.split('')

  function replace (node, value) {
    chunks[node.start] = value
    for (var i = node.start + 1; i < node.end; i++) {
      chunks[i] = ''
    }
  }

  function generate () {
    return chunks.join('')
  }

  function getValue (node) {
    return chunks.slice(node.start, node.end).join('')
  }

  Object.defineProperty(ast, 'replace', {
    configurable: false,
    enumerable: false,
    writable: false,
    value: replace
  })

  Object.defineProperty(ast, 'getValue', {
    configurable: false,
    enumerable: false,
    writable: false,
    value: getValue
  })

  Object.defineProperty(ast, 'generate', {
    configurable: false,
    enumerable: false,
    writable: false,
    value: generate
  })

  return ast
}

module.exports = ikorni
