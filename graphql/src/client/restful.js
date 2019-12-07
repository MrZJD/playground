// rest api test
const axios = require('axios')

axios.get('http://localhost:3000/').then(res => {
    if (res.status === 200 && res.data === 'hello to graphQL demo') {
        console.log('[Restful: /]: ok')
    } else {
        console.error('[Restful: /]: fail')
    }
})

axios.get('http://localhost:3000/Annual/ranks').then(res => {
    if (res.status !== 200) {
        console.error('[Restful: /Annual/ranks]: fail')
        return
    }

    let dataStr = JSON.stringify(res.data, null, 4)
    // console.log(dataStr)
    console.log('[Restful: /Annual/ranks]: ok')
})