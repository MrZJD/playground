const redis = require('redis')
const client = redis.createClient({
    host: '127.0.0.1',
    port: '6379'
})

client.on('error', function (err) {
    console.log("[Error]: ", err)
})

// client.set('name', 'mrzjd', (err, reply) => {
//     console.log('[write ok]')
// })