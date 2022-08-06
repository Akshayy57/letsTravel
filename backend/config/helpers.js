var bcrypt = require('bcrypt');
//Checking the crypto module
const crypto = require('crypto');
const algorithm = 'aes-256-ctr'; //Using AES encryption
const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';
const iv = "2103492a092c610c0d0967dbc9a62739";


module.exports = {
    cryptPassword: function (password) {
        return new Promise((resolve, reject) => {
            bcrypt.genSalt(10, function (err, salt) {
                if (err) {
                    reject(err);
                } else {
                    bcrypt.hash(password, salt, function (err, hash) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(hash)
                        }
                    })
                }
            });
        });
    },
    comparePassword: function (plainPass, hashword) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(plainPass, hashword, function (err, isPasswordMatch) {
                if (err) {
                    reject(err);
                } else {
                    resolve(isPasswordMatch)
                }
            })
        })
    },
    encrypt: function (text) {
        const cipher = crypto.createCipheriv(algorithm, secretKey, Buffer.from(iv, 'hex'));
        const encrypted = Buffer.concat([cipher.update(JSON.stringify(text)), cipher.final()]);

        return encrypted.toString('hex');
    },
    decrypt: function (hash) {
        const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(iv, 'hex'));
        const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash, 'hex')), decipher.final()]);

        return decrpyted.toString();
    }
}