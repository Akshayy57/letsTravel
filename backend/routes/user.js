var express = require('express');
var router = express.Router();
var { con } = require('../config/db');
const { cryptPassword, comparePassword, encrypt } = require('../config/helpers');

router.post('/login', async function (req, res) {
    try {
        let { email, password } = req.body;

        //get user details
        con.query(`SELECT * from users where email = ?`, [email],
            async function (error, results) {
                if (error) {
                    return res.status(400).send(error);
                } else {
                    //comapre password
                    if (results.length > 0) {
                        let user = results[0];
                        let hashword = user.password;
                        let isPasswordMatch = await comparePassword(password, hashword);
                        if (isPasswordMatch) {
                            delete user.password;
                            let token = encrypt(user);
                            user.token = token;
                            return res.status(200).json(user);
                        } else {
                            return res.status(400).send('Invalid Password');
                        }
                    } else {
                        return res.status(400).send('Invalid Email');
                    }
                }
            });
    } catch (error) {
        return res.status(400).send(error.message);
    }
});

router.post('/register', async function (req, res) {
    try {
        let { name, email, mobile, password } = req.body;

        //check if user already exists
        con.query(`SELECT * from users where email = ?`, [email],
            async function (error, results) {
                if (error) {
                    return res.status(400).send(error);
                } else {
                    if (results.length > 0) {
                        return res.status(400).send('User already exists');
                    } else {
                        //create user
                        let hashword = await cryptPassword(password);
                        con.query(`INSERT INTO users (full_name, email, phone, password) VALUES (?,?,?,?)`,
                            [name, email, mobile, hashword],
                            function (error, results) {
                                if (error) {
                                    return res.status(400).send(error);
                                } else {
                                    return res.status(200).send('User created successfully');
                                }
                            });
                    }
                }
            });
    } catch (error) {
        return res.status(400).send(error.message);
    }
})

module.exports = router;
