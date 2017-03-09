const cron = require('node-cron');
const takeScreenshots = require('./takeScreenshots');

function kickIt() {
    takeScreenshots();

    cron.schedule('* * * * *', () => {
        takeScreenshots();
    });
}

module.exports = kickIt;
