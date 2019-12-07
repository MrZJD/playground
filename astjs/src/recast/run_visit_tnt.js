const recast = require('recast')

recast.run(function (ast, printSource) {
    // printSource(ast) // 1. 打印ast源码

    // recast.visit(ast, {
    //     visitExpressionStatement: function ({ node }) {
    //         console.log(node)
    //         return false
    //     }
    // })

    // recast.visit(ast, {
    //     visitExpressionStatement: function (path) {
    //         const node = path.node
    //         printSource(node)
    //         this.traverse(path)
    //     }
    // })

    let tnt = recast.types.namedTypes
    recast.visit(ast, {
        visitExpressionStatement: function (path) {
            if (tnt.ExpressionStatement.check(path.node)) {
                // 这是一个ExpressionStatement
                console.log('这是一个ExpressionStatement')
                printSource(path.node)
                console.log('\n')
            }

            tnt.ExpressionStatement.assert(path.node) // 正确不舒服 错误全局报错

            this.traverse(path)
        }
    })
})