// rest api test
const axios = require('axios')
const CWD = (function () { // 格式化工具
    let args = process.argv.slice(2)
    let data = {}
    let len = args.length
    for (var i=0; i<len; i++) {
        if (args[i].indexOf('-') > -1) {
            let name = args[i].slice(1)
            if (i+1 >= len) {
                data[name] = true
            } else {
                data[name] = args[++i]
            }
        }
    }
    return data
})()

function query () {
    // query
    axios.post('http://localhost:3000/graphql/', `
        {
            ranks {
                nickname
            }
        }
    `, {
        headers: {
            'Content-Type': 'text/plain'
        }
    }).then(res => {
        if (res.status !== 200) {
            console.error('[GraphQL: ranks]: fail')
            return
        }

        let dataStr = JSON.stringify(res.data, null, 4)
        console.log(dataStr)
        console.log('[GraphQL: ranks]: ok')
    })
}

function add () {
    // mutations add
    axios.post('http://localhost:3000/graphql/', `
        mutation {
            addUser (user: {
                id: 123456,
                headPic: "headPicUrl"
            }) {
                success
            }
        }
    `, {
        headers: {
            'Content-Type': 'text/plain'
        }
    }).then(res => {
        if (res.status !== 200) {
            console.error('[GraphQL: ranks]: fail')
            return
        }

        let dataStr = JSON.stringify(res.data, null, 4)
        console.log(dataStr)
        console.log('[GraphQL: add]: ok')
    })
}

function modify () {
    // mutations modify
    axios.post('http://localhost:3000/graphql/', `
        mutation {
            modifyUser (id: 123456, state: {
                headPic: "headPicUrl234789"
            }) {
                success
            }
        }
    `, {
        headers: {
            'Content-Type': 'text/plain'
        }
    }).then(res => {
        if (res.status !== 200) {
            console.error('[GraphQL: ranks]: fail')
            return
        }
    
        let dataStr = JSON.stringify(res.data, null, 4)
        console.log(dataStr)
        console.log('[GraphQL: modify]: ok')
    })
}

switch (CWD.api) {
    case 'query': query(); break;
    case 'add': add(); break;
    case 'modify': modify(); break;
    default: console.log('Can find your api!');
}
