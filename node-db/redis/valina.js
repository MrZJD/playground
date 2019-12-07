const net = require('net')

const client = net.connect({
    host: '127.0.0.1',
    port: 6379
}, () => {
    console.log('hello to redis')
    init()
})

client.on('data', data => {
    console.log( decodeURI(data.toString('utf8')) )
})

client.on('end', () => {
    console.log('disconnected from server')
})

function init () {
    client.write('CONFIG GET *\r\n')
}