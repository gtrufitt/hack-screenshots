const express = require('express');

const router = express.Router();

/* Take a screenshot. */
router.post('/', (req, res, next) => {
    res.send('respond with a resource');
});

module.exports = router;
