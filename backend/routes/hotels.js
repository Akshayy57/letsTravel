var express = require('express');
var router = express.Router();
var { con } = require('../config/db');
const { decrypt } = require('../config/helpers');

//fetch hotels as per search criteria
router.post('/', function (req, res, next) {
    try {
        let { city, budget, checkin, checkout, rooms, persons, hotelName = "" } = req.body;

        hotelName = "%" + hotelName + "%";
        //Get all hotels by city
        con.query(`SELECT h.*,h.id as hotel_id,c.* from hotels h 
            join cities c on h.city_id = c.id
            where 
                h.city_id = ? 
            and 
                h.rent <= ?
            and
                h.hotel_name like ?`,
            [city, budget, hotelName], function (error, results) {
                if (error) {
                    return res.status(400).send(error);
                };
                res.status(200).json(results);
            });
    }
    catch (error) {
        return res.status(400).send(error.message);
    }
});

router.post('/book', function (req, res, next) {
    try {
        //check auth token
        let token = req.headers['token'];
        if (!token) {
            return res.status(403).send('Authentication Failed !');
        }

        let userData = JSON.parse(decrypt(token));
        let { hotel_id, rooms, persons, checkin, checkout } = req.body;

        //split date in format yyyy-mm-dd from mm-dd-yyyy
        let checkinDate = checkin.split('-');
        let checkoutDate = checkout.split('-');

        checkin = checkinDate[2] + '-' + checkinDate[0] + '-' + checkinDate[1];
        checkout = checkoutDate[2] + '-' + checkoutDate[0] + '-' + checkoutDate[1];
        //Get all hotels by city
        con.query(`INSERT INTO bookings (hotel_id, user_id, rooms, persons, checkin, checkout) VALUES (?,?,?,?,?,?)`,
            [hotel_id, userData.id, rooms, persons, checkin, checkout], function (error, results) {
                if (error) {
                    return res.status(400).send(error);
                };
                res.status(200).json('Booking successful');
            });
    }
    catch (error) {
        return res.status(400).send(error.message);
    }
})

router.get('/getHistory', function (req, res, next) {
    try {
        //check auth token
        let token = req.headers['token'];
        if (!token) {
            return res.status(403).send('Authentication Failed !');
        }

        let userData = JSON.parse(decrypt(token));

        //Get all hotels by city
        con.query(`
        SELECT 
            DATE_FORMAT(b.checkin, "%d-%M-%Y") as checkin,
            DATE_FORMAT(b.checkout, "%d-%M-%Y") as checkout,
            b.rooms,
            b.persons,
            b.date_created as booking_date,
            h.hotel_name,
            h.address,
            h.rent as rent_per_room,
            b.rooms * h.rent as total_rent,
            c.city,
            c.state,
            c.country
        from 
            bookings b
        JOIN 
            hotels h
        ON 
            b.hotel_id = h.id
        JOIN
            cities c
        ON
            h.city_id = c.id
        where 
            b.user_id = ?
        ORDER BY
            b.checkin DESC`,
            [userData.id], function (error, results) {
                if (error) {
                    return res.status(400).send(error);
                };
                res.status(200).json(results);
            });
    } catch (error) {
        return res.status(400).send(error.message);
    }
})


module.exports = router;