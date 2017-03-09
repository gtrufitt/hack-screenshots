const videoshow = require('videoshow');

const images = [
    './public/images/screenshots/thedailyfail/1488712488559.png',
    './public/images/screenshots/thedailyfail/1488712860997.png',
    './public/images/screenshots/thedailyfail/1488713400848.png',
    './public/images/screenshots/thedailyfail/1488715740005.png',
    './public/images/screenshots/thedailyfail/1488712488559.png',
    './public/images/screenshots/thedailyfail/1488712860997.png',
    './public/images/screenshots/thedailyfail/1488713400848.png',
    './public/images/screenshots/thedailyfail/1488715740005.png'
];

const videoOptions = {
    fps: 25,
    loop: 0.5, // seconds
    transition: false,
    videoBitrate: 1024,
    videoCodec: 'libx264',
    size: '640x?',
    format: 'mp4',
    pixelFormat: 'yuv420p'
};

videoshow(images, videoOptions)
    .save('./public/videos/test.mp4')
    .on('start', command => {
        console.log('ffmpeg process started:', command);
    })
    .on('error', (err, stdout, stderr) => {
        console.error('Error:', err);
        console.error('ffmpeg stderr:', stderr);
    })
    .on('end', output => {
        console.error('Video created in:', output);
    });
