var ikorni = require('./index.js')
var test = require('tape')

test('should mutate single object', function (t) {
  t.plan(1)
  var input = `require.ensure('a.js', function() {});`
  var output = `require.ensure('foo.js', function() {});`
  var ast = ikorni.parse(input)
  ast.replace(ast.body[0].expression.arguments[0], `'foo.js'`)
  t.equal(ast.generate(), output)
})

test('should mutate multiple objects', function (t) {
  t.plan(1)
  var input = `require.ensure(['a.js', 'b.js'], function() {});`
  var output = `require.ensure([0, 1], function() {});`
  var ast = ikorni.parse(input)
  var elements = ast.body[0].expression.arguments[0].elements
  for (var i = 0; i < elements.length; i++) {
    ast.replace(elements[i], i)
  }
  t.equal(ast.generate(), output)
})
