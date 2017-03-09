const cron = require('node-cron');
const takeScreenshots = require('./takeScreenshots');

function kickIt() {
    cron.schedule('* * * * *', () => {
        takeScreenshots();
    });
}

module.exports = kickIt;
