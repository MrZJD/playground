/**
 * @file
 * @desc Nodejs Crypto About Symmetric-Key Encryption
 * 
 * @desc 对称式加密: 加密和解密时使用相同的密钥
 * 
 * @desc 常见算法: AES 3DES IDEA TwoFish RC
 * 
 * @desc 可以分为两大策略 StreamCipers BlockCipers
 * 
 * @desc StreamCipers 流式加密 A5/1 RC4
 *       通过明文的数据流，将密钥延展成为一长串keystream -> XOR
 * 
 * @desc BlockCipers 区块加密 ECB CBC CFB OFB
 *       将明文切片拆分为多个长度固定的数据块，每个区块使用相同的演算方式 CBC为最常用的演算方式
 */

const crypto = require('crypto');

(function AES256() {
    // 1. AES256
    let aesCipher = crypto.createCipher('aes256', 'key');
    let encrypted = aesCipher.update('i am mrzjd, hello nodejs', 'utf8', 'hex');
    encrypted += aesCipher.final('hex');
    console.log(encrypted);

    let aseDecipher = crypto.createDecipher('aes256', 'key');
    let decrypted = aseDecipher.update(encrypted, 'hex', 'utf8');
    decrypted += aseDecipher.final('utf8');
    console.log(decrypted);
})();

(function AES256_CBC() {
    // 1.1 AES256_CBC
    let key = crypto.randomBytes(32);
    let iv = crypto.randomBytes(16);
    let aesCbcCipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encryptedCbc = aesCbcCipher.update('i am mrzjd, hello nodejs', 'utf8', 'hex');
    encryptedCbc += aesCbcCipher.final('hex');
    console.log(encryptedCbc);

    let div = iv;
    let aseCbcDecipher = crypto.createDecipheriv('aes-256-cbc', key, div);
    let decryptedCbc = aseCbcDecipher.update(encryptedCbc, 'hex', 'utf8');
    decryptedCbc += aseCbcDecipher.final('utf8');
    console.log(decryptedCbc);
})();


(function DES3() {
    // 2. 3DES
    let des3Cipher = crypto.createCipher('des3', 'key');
    let des3Enrypted = des3Cipher.update('i am mrzjd, hello nodejs', 'utf8', 'hex');
    des3Enrypted += des3Cipher.final('hex');
    console.log(des3Enrypted);

    let des3Decipher = crypto.createDecipher('des3', 'key');
    let des3Decrypted = des3Decipher.update(des3Enrypted, 'hex', 'utf8');
    des3Decrypted += des3Decipher.final('utf8');
    console.log(des3Decrypted);
})();

(function DES3_CBC() {
    // 2.1 3DES_CBC
    let iv = crypto.randomBytes(8);
    let key = crypto.randomBytes(24);
    let cipher = crypto.createCipheriv('des-ede3-cbc', key, iv);
    let encrypted = cipher.update('i am mrzjd, hello nodejs', 'utf8', 'hex');
    encrypted += cipher.final('hex');
    console.log(encrypted);

    let decipher = crypto.createDecipheriv('des-ede3-cbc', key, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    console.log(decrypted);
})();