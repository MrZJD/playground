/**
 * @file
 * @desc Nodejs Crypto About Hash Function
 * 
 * @desc 杂凑函数: 将任意长度的值，转换为一串固定大小的值 *任何相同的值经过hash fn后得到的值都是相同的*
 * @desc 常见算法: MD5 SHA1 SHA2 SHA3 Ripemd (MD5, SHA1已被破解)
 * 
 * @desc 由于相同的值加密后的值也相同，容易被暴力破解
 *       1. 加盐salt 2. stretching多次延展 3. 通过记忆体
 * 
 * @desc 加盐: 在明文中混入一段已知的随机字符
 */

const crypto = require('crypto');

(function md5() {
    // 1. MD5
    let md5 = crypto.createHash('md5');
    let md5code = md5.update('i am mrzjd, hello nodejs').digest('hex');
    console.log(md5code);
})();

(function sha256() {
    let sha256 = crypto.createHash('sha256');
    let sha256code = sha256.update('i am mrzjd, hello nodejs').digest('hex');
    console.log(sha256code);
})();

(function hmac() {
    let hmac = crypto.createHmac('sha256', 'salt'); // 加secret hash策略
    let hmaccode = hmac.update('i am mrzjd, hello nodejs').digest('hex');
    console.log(hmaccode);
})();

(function pbkdf2() {
    // 以hmac方式strectching多次延展计算
    crypto.pbkdf2('i am mrzjd, hello nodejs', 'salt', 10000, 32, 'sha512', function(err, key) {
        if (err) throw err;
        console.log(key.toString('hex'));
    });
})();
