/**
 *                    LISP                             C
 * 2 + 2            (add 2 2)                       add(2, 2)
 * 4 - 2            (subtract 4 2)                  subtract(4, 2) 
 * 2 + (4 - 2)      (add 2 (subtract 4 2))          add(2, subtract(4, 2))
 */

// 词法分析
function tokenizer (input) {
    let current = 0
    let tokens = []

    while (current < input.length) {
        let ch = input[current]

        if (ch === '(') {
            tokens.push({
                type: 'paren',
                value: '('
            })

            current++
            continue
        }

        if (ch === ')') {
            tokens.push({
                type: 'paren',
                value: ')'
            })

            current++
            continue
        }

        // 空格
        let WIHTESPACE = /\s/
        if (WIHTESPACE.test(ch)) {
            current++
            continue
        }
        // 字面量数值
        let NUMBERS = /[0-9]/
        if (NUMBERS.test(ch)) {
            let val = ''
            while (NUMBERS.test(ch)) {
                val += ch
                ch = input[++current]
            }

            tokens.push({
                type: 'number',
                value: val
            })
            continue
        }
        // 字面量字符串
        if (ch === '"') {
            let val = ''
            ch = input[++current]

            while (ch !== '"') {
                val += ch
                ch = input[++current]
            }

            ch = input[++current]
            tokens.push({
                type: 'string',
                value: val
            })
            continue
        }
        // 关键词
        let LETTERS = /[a-z]/i
        if (LETTERS.test(ch)) {
            let val = ''
            
            while (LETTERS.test(ch)) {
                val += ch
                ch = input[++current]
            }

            tokens.push({
                type: 'name',
                value: val
            })
            continue
        }

        throw new TypeError('Ocurred to unknow character: ' + ch)
    }

    return tokens
}

// 语法分析
function parser (tokens) {
    let current = 0

    function walk () {
        let token = tokens[current]

        if (token.type === 'number') {
            current++
            return {
                type: 'NumberLiteral',
                value: token.value
            }
        }

        if (token.type === 'string') {
            current++
            return {
                type: 'StringLiteral',
                value: token.value
            }
        }

        if (token.type === 'paren' && token.value === '(') {
            token = tokens[++current]

            let node = {
                type: 'CallExpression',
                name: token.value,
                params: []
            }

            token = tokens[++current]

            while (
                (token.type !== 'paren') || 
                (token.type === 'paren' && token.value !== ')')
            ) {
                node.params.push(walk()) // 递归
                token = tokens[current]
            }

            current++

            return node
        }

        throw new TypeError(token.type)
    }

    let ast = {
        type: 'Program',
        body: []
    }

    while (current < tokens.length) {
        ast.body.push(walk())
    }

    return ast
}

// traverser 遍历器
function traverser (ast, visitor) {

    function traverseArray (array, parent) {
        array.forEach(child => {
            traverseNode(child, parent)
        })
    }

    function traverseNode (node, parent) {
        let methods = visitor[node.type]

        if (methods && methods.enter) {
            methods.enter(node, parent)
        }

        switch (node.type) {
            case 'Program': traverseArray(node.body, node); break;
            case 'CallExpression': traverseArray(node.params, node); break;
            case 'NumberLiteral':
            case 'StringLiteral': break;
            default: throw new TypeError(node.type)
        }

        if (methods && methods.exit) {
            methods.exit(node, parent)
        }
    }

    traverseNode(ast, null)
}

// transformer 转换器
function transformer (ast) {
    let newAst = {
        type: 'Program',
        body: []
    }

    ast._context = newAst.body

    traverser(ast, {
        NumberLiteral: {
            enter (node, parent) {
                parent._context.push({
                    type: 'NumberLiteral',
                    value: node.value
                })
            }
        },
        StringLiteral: {
            enter (node, parent) {
                parent._context.push({
                    type: 'StringLiteral',
                    value: node.value
                })
            }
        },
        CallExpression: {
            enter (node, parent) {
                let expression = {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: node.name
                    },
                    arguments: []
                }

                node._context = expression.arguments

                if (parent.type != 'CallExpression') {
                    expression = {
                        type: 'ExpressionStatement',
                        expression: expression
                    }
                }

                parent._context.push(expression)
            }
        }
    })

    return newAst
}

// generator 生成器
function codeGenerator (node) {
    switch (node.type) {
        case 'Program':
            return node.body.map(codeGenerator).join('\n')
        case 'ExpressionStatement':
            return codeGenerator(node.expression) + ';'
        case 'CallExpression':
            return `${codeGenerator(node.callee)}(${node.arguments.map(codeGenerator).join(', ')})`
        case 'Identifier':
            return node.name
        case 'NumberLiteral':
            return node.value
        case 'StringLiteral':
            return `"${node.value}"`
        default:
            throw new TypeError(node.type)
    }
}

// compiler
function compiler (input) {
    let tokens = tokenizer(input)
    let ast = parser(tokens)
    let newAst = transformer(ast)
    let output = codeGenerator(newAst)

    return output
}

if (module) {
    module.exports = {
        tokenizer,
        parser,
        traverser,
        transformer,
        codeGenerator,
        compiler
    }
}

// test
// console.log( compiler('(add 2 2)') ) // add(2, 2)
// console.log( compiler('(subtract 4 2)') ) // subtract(4, 2)
// console.log( compiler('(add 2 (subtract 4 2))') ) // add(2, substract(4, 2))
// console.log( compiler('(concat "foo" "bar")') ) // concat("foo", "bar")