const {
    GraphQLObjectType, GraphQLInputObjectType, GraphQLList, GraphQLString, GraphQLInt, GraphQLBoolean
} = require('graphql')
const rank = require('../model/rank')

const user = new GraphQLObjectType({
    name: 'user',
    // 可选字段
    fields: {
        headPic: {
            type: GraphQLString
        },
        nickname: {
            type: GraphQLString
        },
        score: {
            type: GraphQLInt
        },
        id: {
            type: GraphQLInt
        },
        level: {
            type: GraphQLInt
        },
        rid: {
            type: GraphQLInt
        },
        isPlaying: {
            type: GraphQLBoolean
        },
        isLoved: {
            type: GraphQLBoolean
        }
    }
})

const OutputType = new GraphQLObjectType({
    name: 'output',
    fields: {
        id: {
            type: GraphQLInt
        },
        success: {
            type: GraphQLBoolean
        }
    }
})

const query = {
    type: new GraphQLList(user),
    // 接收参数
    args: {
        id: {
            type: GraphQLInt
        }
    },
    resolve (value, args) {
        let data = rank.query()
        if (args.id) {
            data = data.filter(item => {
                return item.id === args.id
            })
        }
        return data
    }
}

const UserInputType = new GraphQLInputObjectType({
    name: 'inputUser',
    fields: {
        headPic: {
            type: GraphQLString
        },
        nickname: {
            type: GraphQLString
        },
        score: {
            type: GraphQLInt
        },
        id: {
            type: GraphQLInt
        },
        level: {
            type: GraphQLInt
        },
        rid: {
            type: GraphQLInt
        },
        isPlaying: {
            type: GraphQLBoolean
        },
        isLoved: {
            type: GraphQLBoolean
        }
    }
})

const add = {
    type: OutputType,
    args: {
        user: {
            type: UserInputType
        }
    },
    resolve (value, args) {
        let data = value || args
        try {
            rank.create(data.user)
        } catch (e) {
            return {
                id: null,
                success: false
            }
        }
        return {
            id: data.user.id,
            success: true
        }
    }
}

const modify = {
    type: OutputType,
    args: {
        id: { type: GraphQLInt },
        state: { type: UserInputType }
    },
    resolve (value, args) {
        try {
            rank.modify({
                id: args.id
            }, args.state)
        } catch (e) {
            return {
                id: null,
                success: false
            }
        }
        return {
            id: args.id,
            success: true
        }
    }
}

const del = {
    // 暂未实现
}

module.exports = {
    query, add, modify, del
}