const webshot = require('webshot');
const fs = require('fs');
const adblock = require('./adblock');

const websites = [
    {
        name: 'The Guardian',
        key: 'theguardian',
        domain: 'https://www.theguardian.com'
    },
    {
        name: 'The Daily Mail',
        key: 'thedailyfail',
        domain: 'http://www.dailymail.co.uk/home/index.html'
    },
    {
        name: 'The Telegraph',
        key: 'thetelegraph',
        domain: 'http://www.telegraph.co.uk/'
    }
];

const webshotOptions = {
    onLoadFinished: adblock
};

const takeScreenshotAndSave = site => {
    webshot(
        site.domain,
        `./public/images/screenshots/${site.key}/${new Date().getTime()}.png`,
        webshotOptions,
        () => {
            console.info(`Saved a screenshot of ${site.name}`);
        }
    );
};

module.exports = () => {
    websites.forEach(takeScreenshotAndSave);
};
