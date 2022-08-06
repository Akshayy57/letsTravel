var express = require('express');
var router = express.Router();
var { con } = require('../config/db');
const { decrypt } = require('../config/helpers');

router.post('/add', function (req, res) {
    //check auth token
    let token = req.headers['token'];
    if (!token) {
        return res.status(403).send('Authentication Failed !');
    }

    let userData = JSON.parse(decrypt(token));
    let { hotel_id } = req.body;

    //check hotel id already exist in wishlist than throw error
    con.query(`SELECT * FROM wishlist WHERE hotel_id = ? AND user_id = ?`, [hotel_id, userData.id], function (error, results) {
        if (error) {
            return res.status(400).send(error);
        }
        if (results.length > 0) {
            return res.status(400).send('Hotel already exist in wishlist');
        }

        //insert into wishlist
        con.query(`INSERT INTO wishlist (hotel_id, user_id) VALUES (?,?)`,
            [hotel_id, userData.id], function (error, results) {
                if (error) {
                    return res.status(400).send(error);
                };
                res.status(200).json('Added to wishlist');
            });
    });

});

//get wishlist
router.get('/get', function (req, res) {
    //check auth token
    let token = req.headers['token'];
    if (!token) {
        return res.status(403).send('Authentication Failed !');
    }

    let userData = JSON.parse(decrypt(token));

    //get wishlist
    con.query(`
        SELECT 
            h.*,h.id as hotel_id,c.* 
        from 
            hotels h
        join 
            cities c on h.city_id = c.id
        join 
            wishlist w on h.id = w.hotel_id
        where 
            w.user_id = ?`,
        [userData.id], function (error, results) {
            if (error) {
                return res.status(400).send(error);
            };
            res.status(200).json(results);
        });
});

//deelte from wishlist
router.post('/delete', function (req, res) {
    //check auth token
    let token = req.headers['token'];
    if (!token) {
        return res.status(403).send('Authentication Failed !');
    }

    let userData = JSON.parse(decrypt(token));
    let { hotel_id } = req.body;

    //delete from wishlist
    con.query(`DELETE FROM wishlist WHERE hotel_id = ? AND user_id = ?`,
        [hotel_id, userData.id], function (error, results) {
            if (error) {
                return res.status(400).send(error);
            };
            res.status(200).json('Deleted from wishlist');
        });
});




module.exports = router;
