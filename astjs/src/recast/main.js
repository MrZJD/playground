const recast = require('recast')

const code = `
    function add (a, b) {
        return a + b
    }
`

const ast = recast.parse(code)

// console.log('** program body  **')
// console.log(ast.program.body)
// console.log('** params **')
// console.log(ast.program.body[0].params)
// console.log('** return statement **')
// console.log(ast.program.body[0].body.body[0])

/* Casting Code */

const {
    variableDeclaration,
    variableDeclarator,
    functionExpression
} = recast.types.builders

const add = ast.program.body[0]
ast.program.body[0] = variableDeclaration('const', [
    variableDeclarator(add.id, functionExpression(
        null, // anon-function
        add.params,
        add.body
    ))
])
const output = recast.print(ast).code
// recast.prettyPrint(ast, { tabWidth: 2 }).code
console.log(output)