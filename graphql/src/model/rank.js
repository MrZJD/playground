const db = require('../db/db.js')

const UserSchema = {
    headPic: String,
    nickname: String,
    score: Number,
    id: Number,
    level: Number,
    rid: Number,
    isPlaying: Number,
    isLoved: Number
}

const CRUD = {
    create: function (obj) {
        let rank = db.Rank
        if (!rank.data) {
            rank.data = [obj]
        } else {
            rank.data.push(obj)
        }
        db.Rank = rank
    },
    query: function (where) {
        let rank = db.Rank
        if (!where) {
            return rank.data
        }

        let keys = Object.keys(where)
        let klen = keys.length
        if (klen === 0) {
            return rank.data
        }

        if (!rank.data) {
            throw new Error('can not find your spec item')
        }
        
        let res = []
        rank.data.forEach(item => {
            for (let i=0; i<klen; i++) {
                let k = keys[i]
                if (item[k] !== where[k]) {
                    return
                }
            }
            res.push(item)
        })

        return res
    },
    modify: function (where, to) {
        let rank = db.Rank
        if (!where || !to) {
            throw new Error('you must spec modify condition')
        }

        let keys = Object.keys(where)
        let klen = keys.length
        if (!rank.data) {
            throw new Error('can not find your spec item')
        }

        var toKeys = Object.keys(to)
        var tlen = toKeys.length
        rank.data.forEach(item => {
            for (let i=0; i<klen; i++) {
                let k = keys[i]
                if (item[k] !== where[k]) {
                    return
                }
            }
            for (let i=0; i<tlen; i++) {
                let k = toKeys[i]
                item[k] = to[k]
            }
        })

        db.Rank = rank
    }
    // delete: function () {}  // TODO
}

module.exports = CRUD