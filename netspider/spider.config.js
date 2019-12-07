module.exports = {
    target: 'http://hs.hebpr.cn/002/002009/002009002/002009002003/',
    elements: [{
        name: 'link',
        root: '.frame-con-link',
        cols: [{
            name: 'name',
            node: '.frame-con-txt',
            type: 1
        }, {
            name: 'value',
            node: 'self',
            type: 2,
            value: 'href'
        }]
    }]
}