const express = require('express');
const makeVideo = require('../makeVideo');
const router = express.Router();

/* Take a screenshot. */
router.post('/', (req, res) => {
    makeVideo('thedailyfail')
        .then(response => {
            res.send(response);
        })
        .catch(res.send);
});

module.exports = router;
