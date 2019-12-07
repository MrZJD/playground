const store = require('mem-fs').create()
const editor = require('mem-fs-editor').create(store)
const path = require('path')

// 加载所需文件
const files = {
    Group: path.resolve(__dirname, 'Group.db.json'), // 团队列表
    Members: path.resolve(__dirname, 'Members.db.json'), // 团队成员列表
    Users: path.resolve(__dirname, 'Users.db.json'), // 用户列表
    Rank: path.resolve(__dirname, 'Rank.db.json'), // 榜单列表
}
const database = {}

// 初始化
;(function initDB () {
    Object.keys(files).forEach(k => {
        if (editor.exists(files[k])) {
            editor.readJSON(files[k])
        } else {
            editor.writeJSON(files[k], {})
        }
        define(k, files[k])
    })
})()

// 定义proxy代理便于访问
function define (tableName, filePath) {
    Object.defineProperty(database, tableName, {
        get: function () {
            return editor.readJSON(filePath)
        },
        set: function (val) {
            editor.writeJSON(filePath, val)
        }
    })
}

// 退出即保存
function save () {
    console.log('[BeforeExit: save db file changes]')
    editor.commit(() => {
        process.exit()
    })
}

process.addListener('beforeExit', save)
process.addListener('SIGINT', save)
// process.addListener('uncaughtException', save)
// process.addListener('unhandledRejection', save)

module.exports = database