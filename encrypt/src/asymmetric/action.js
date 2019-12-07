/**
 * @file
 * @desc Nodejs Crypto About Asymmetric Encryption
 * 
 * @desc 非对称式加密: 公开公钥加密
 * 
 * @desc 使用公钥加密 私钥解密 用于信息传输 C -> S
 * @desc 使用私钥加密 公钥解密 用于签名认证 S -> C
 */

(function RSA() {
    const NodeRSA = require('node-rsa');

    let key = new NodeRSA({b: 1024});

    let encryted = key.encrypt('i am mrzjd, hello nodejs', 'base64');
    console.log(encryted);

    let decrypted = key.decrypt(encryted, 'utf8');
    console.log(decrypted);
})();

(function RSA_Sign_Verify() {
    const fs = require('fs');
    const crypto = require('crypto');

    let privateKey = fs.readFileSync('./private.pem');
    let publicKey = fs.readFileSync('./public.pem');

    let sign = crypto.createSign('RSA-SHA256');
    sign.update('i am mrzjd, hello nodejs');
    let signature = sign.sign(privateKey, 'hex');

    // console.log(signature); // 私钥加密

    const verify = crypto.createVerify('RSA-SHA256');
    verify.update('i am mrzjd, hello nodejs');
    let output = verify.verify(publicKey, signature, 'hex'); // 公钥解密 认证

    console.log(output); // 认证结果 true/false
})();