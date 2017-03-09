const videoshow = require('videoshow');

function getImages(site) {
    return [
        `./public/images/screenshots/${site}/1488712488559.png`,
        `./public/images/screenshots/${site}/1488712860997.png`,
        `./public/images/screenshots/${site}/1488713400848.png`,
        `./public/images/screenshots/${site}/1488715740005.png`,
        `./public/images/screenshots/${site}/1488712488559.png`,
        `./public/images/screenshots/${site}/1488712860997.png`,
        `./public/images/screenshots/${site}/1488713400848.png`,
        `./public/images/screenshots/${site}/1488715740005.png`
    ];
}

const defVideoOptions = {
    fps: 25,
    loop: 0.5, // seconds
    transition: false,
    videoBitrate: 1024,
    videoCodec: 'libx264',
    size: '640x?',
    format: 'mp4',
    pixelFormat: 'yuv420p'
};

function makeVideo(site, options) {
    const videoOptions = Object.assign(defVideoOptions, options);
    return new Promise((resolve, reject) => {
        videoshow(getImages(site), videoOptions)
            .save('./public/videos/test.mp4')
            .on('start', command => {
                console.log('ffmpeg process started:', command);
            })
            .on('error', (err, stdout, stderr) => {
                console.error('Error:', err);
                console.error('ffmpeg stderr:', stderr);
                reject('Error creating video');
            })
            .on('end', output => {
                console.error('Video created in:', output);
                resolve('Video created');
            });
    });
}

module.exports = makeVideo;
