const Koa = require('koa')
const Router = require('koa-router')
const KoaBody = require('koa-body')
const cors = require('@koa/cors')
const graphQL = require('./graphql.js')
const restful = require('./restful')

const app = new Koa()
const router = new Router()

// default index
router.get('/', ctx => {
    ctx.body = 'hello to graphQL demo'
})

// graphQL
router.post('/graphql', KoaBody(), graphQL)

// restful
restful(router)

app.use(cors())
app.use(router.routes()).listen(3000)
console.log('Welcome to GraphQL VS Restful.')