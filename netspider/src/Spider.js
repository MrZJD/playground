const http = require('http')
const promisify = require('util').promisify
const cheerio = require('cheerio')

const request = function (config) {
    return new Promise((resolve, reject) => {
        http.request(config, (res) => {
            let html = ''
            res.on('data', (chunk) => {
                html += chunk
            })
            res.on( 'end', () => {
                resolve({
                    statusMessage: res.statusMessage,
                    statusCode: res.statusCode,
                    headers: res.headers,
                    body: html
                })
            })
            res.on('error', (err) => {
                throw(err)
            })
        }).end()
    })
}


/**
 * @class Spider
 * @desc 可复用网络爬虫
 */
class Spider {
    /**
     * @constructor
     * @param {string} url 目标网址
     * @param {[{name, element}]} target 目标节点
     */
    constructor () {
    }

    async start (urlObj, target) {

        let res = await request(urlObj)

        let $ = cheerio.load(res.body)

        let output = {}
        target.forEach((item) => { // 遍历表
            output[item.name] = []

            let dist = output[item.name]
            let root = $(item.root)

            root.toArray().forEach(rowNode => { // 遍历行
                let rowItem = {}
                item.cols.forEach(col => { // 遍历列
                    let node
                    if (col.node === 'self') {
                        // 取自身
                        node = $(rowNode)
                    } else {
                        node = $(rowNode).find(col.node)
                    }

                    rowItem[col.name]
                    if (col.type === 2) {
                        node.toArray().forEach(element => {
                            rowItem[col.name] = $(element).attr('href').trim()
                        })
                    } else {
                        node.toArray().forEach(element => {
                            rowItem[col.name] = $(element).text().trim()
                        })
                    }
                })
                dist.push(rowItem)
            })
        })
        return output
    }
}

module.exports = Spider
