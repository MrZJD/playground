const url = require('url')
const path = require('path')
const http = require('http')
const fs = require('fs')
const config = require('./spider.config')
const Spider = require('./src/Spider')

const writeFile = require('util').promisify(fs.writeFile)

async function start () {
    let spider = new Spider()
    let output = {link: []}
    let links = []
    new Array(147).fill(0).forEach((value, index) => {
        let url = config.target + (index+1) + '.html'
        links.push(spider.start(url, config.elements))
    })

    Promise.all(links)
        .then(async res => {
            res.forEach((out) => {
                output.link = output.link.concat(out.link)
            })

            console.log('finished')

            await writeFile(`./dist/output.${Date.now()}.json`, JSON.stringify(output, null, 4))
        })
}

start()
