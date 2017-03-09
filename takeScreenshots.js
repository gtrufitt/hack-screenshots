const webshot = require('webshot');
const fs = require('fs');

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

websites.forEach(site => {
    const renderStream = webshot(site.domain);
    const file = fs.createWriteStream(
        `./public/images/screenshots/${site.key}/${new Date().getTime()}.png`,
        {encoding: 'binary'}
    );

    renderStream.on('data', data => {
        file.write(data.toString('binary'), 'binary');
    });
});
