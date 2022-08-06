var express = require('express');
var router = express.Router();
var { con } = require('../config/db');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Travel Web' });
});

router.get('/getCities', function (req, res, next) {
  try {

    let search = req.query.search ? '%' + req.query.search + '%' : '';

    //Get all cities by state
    con.query(`SELECT * from cities ${search ? `where (city LIKE ? OR state LIKE ? )` : ''}`,
      [search, search], function (error, results) {
        if (error) {
          return res.status(400).send(error);
        };
        res.status(200).json(results);
      });

  } catch (error) {
    return res.status(400).send(error);
  }
})

module.exports = router;
