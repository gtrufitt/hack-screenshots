const videoshow = require('videoshow');
const fs = require('fs');
const fsp = require('fs-promise');
const junk = require('junk');

function getImageFromDateRange(folderPath, {dateFrom, dateTo}) {
    return file => fs.statSync(folderPath + file, (err, stats) => {
        const milliBirthTime = new Date(stats.birthtime).getTime();
        return milliBirthTime > dateFrom && milliBirthTime < dateTo;
    });
}

function getImages(site, selectionOptions) {
    const folderPath = `./public/images/screenshots/${site}/`;
    return fsp.readdir(folderPath).then(files => files
            .filter(getImageFromDateRange(folderPath, selectionOptions))
            .filter(junk.not)
            .map(file => folderPath + file));
}

const defVideoOptions = {
    fps: 25,
    loop: 0.2, // seconds
    transition: false,
    videoBitrate: 1024,
    videoCodec: 'libx264',
    size: '640x?',
    format: 'mp4',
    pixelFormat: 'yuv420p'
};

function makeVideo(site, selectionOptions, videoOptions) {
    const mergedVideoOptions = Object.assign(defVideoOptions, videoOptions);
    return new Promise((resolve, reject) => getImages(
        site,
        selectionOptions
    ).then(imageArr => {
        videoshow(imageArr, mergedVideoOptions)
            .save(`./public/videos/${site}-${Date.now()}.mp4`)
            .on('start', command => {
                console.log('ffmpeg process started');
            })
            .on('error', (err, stdout, stderr) => {
                console.error('Error:', err);
                console.error('ffmpeg stderr:', stderr);
                reject('Error creating video');
            })
            .on('end', output => {
                console.error('Video created in:', output);
                return resolve(
                    `Video created: <a href="videos/${site}-${Date.now()}.mp4>Download</a>`
                );
            });
    }));
}

module.exports = makeVideo;
