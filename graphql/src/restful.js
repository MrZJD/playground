const rank = require('./model/rank')

function apiInit (ctx) {
    ctx.body = 'init'
}

function apiGroupMembers (ctx) {
    ctx.body = 'myGroupMembers'
}

function apiRanks (ctx) {
    ctx.body = JSON.stringify({
        errno: 0,
        msg: '',
        data: rank.query()
    })
}

const routesMap = {
    'init': apiInit,
    'myGroupMembers': apiGroupMembers,
    'ranks': apiRanks
}

function routes (router) {
    router.get('/Annual/:api', ctx => {
        var handler = routesMap[ctx.params.api]
        if (routesMap[ctx.params.api]) {
            handler(ctx)
        } else {
            ctx.body = 'Can not find your api'
        }
    })
}

module.exports = routes