const { graphql, GraphQLSchema, GraphQLObjectType } = require('graphql')
const rankField = require('./schema/rank.schema.js')

const RootSchema = new GraphQLSchema({
    // 定义查询Schema
    query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
            // api
            ranks: rankField.query
        }
    }),
    // 定义操作变化Mutations
    mutation: new GraphQLObjectType({
        name: 'Mutations',
        fields: () => ({
            addUser: rankField.add,
            modifyUser: rankField.modify,
            // delUser: rankField.del
        })
    })
})

function graphQL (ctx) {
    let body = ctx.request.body
    graphql(RootSchema, body.query, body.variables).then(res => {
        // let data = res.data
        // if (res.data && Object.keys(res.data).length === 1) {
        //     data = res.data[Object.keys(res.data)[0]]
        // }
        // ctx.body = {
        //     errno: 0,
        //     msg: '',
        //     data
        // }
        ctx.body = res
    })
}

module.exports = graphQL
