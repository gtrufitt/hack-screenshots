const express = require('express');
const makeVideo = require('../makeVideo');
const router = express.Router();

/* Take a screenshot. */
router.post('/', (req, res) => {
    makeVideo('theguardian', {
        dateFrom: new Date('2017-03-09T10:51:15.000Z').getTime(),
        dateTo: new Date('2017-03-09T12:51:15.000Z').getTime()
    })
        .then(response => {
            res.send(response);
        })
        .catch(res.send);
});

module.exports = router;
