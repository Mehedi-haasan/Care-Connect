const Jwt = require("../middleware/authentication");
const upload = require('../multer/Upload')

const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
ffmpeg.setFfmpegPath(ffmpegPath);

const path = require('path');
const fs = require('fs');
const db = require('../models')
const StrimData = db.striming_data

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/upload/image", upload.single('image_url'), async (req, res) => {
        try {
            const image_url = req.file;
            console.log(image_url);

            if (!image_url) {
                return res.status(400).send({
                    success: false,
                    message: "No file uploaded."
                });
            }

            res.status(200).send({
                success: true,
                image_url: `http://localhost:8050/uploads/${image_url.filename}`
            });
        } catch (error) {
            res.status(500).send({
                success: false,
                message: "An error occurred while uploading the image.",
                error: error.message
            });
        }
    });




    app.post("/api/upload/image/register", upload.single('image_url'), async (req, res) => {
        try {
            const image_url = req.file;
            if (!image_url) {
                return res.status(400).send({
                    success: false,
                    message: "No file uploaded."
                });
            }

            res.status(200).send({
                success: true,
                image_url: `http://localhost:8050/uploads/${image_url.filename}`
            });
        } catch (error) {
            res.status(500).send({
                success: false,
                message: "An error occurred while uploading the image.",
                error: error.message
            });
        }
    });



    const CreateData = async (outputs) => {
        let data = await StrimData.create({
            'name': name,
            'quality': quality,
            'video_url': video_url
        })
        return data
    }



    app.post('/api/upload/video', upload.single('video'), async (req, res) => {
        try {
            const video = req.file;
            const baseUrl = `http://localhost:8050/uploads`;
            if (!video) {
                return res.status(400).send({
                    success: false,
                    message: 'No video uploaded'
                });
            }

            const inputPath = video.path;

            const videoName = path.parse(video.filename).name;

            const outputDir = path.join("C:", "Video-Striming", "server", "uploads");

            if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir, { recursive: true });
            }

            const resolutions = [
                { name: '1080p', height: 1080 },
                { name: '720p', height: 720 },
                { name: '480p', height: 480 }
            ];

            const convertVideo = (resolution) => {
                return new Promise((resolve, reject) => {
                    const outputPath = path.join(outputDir, `${Date.now()}-${resolution.name}.mp4`);

                    ffmpeg(inputPath)
                        .videoCodec('libx264')
                        .size(`?x${resolution.height}`)
                        .on('end', () => resolve(outputPath))
                        .on('error', reject)
                        .save(outputPath);
                });
            };

            const outputs = await Promise.all(
                resolutions.map(convertVideo)
            );

            const videos = Object.fromEntries(
                outputs.map(file => {
                    const fileName = path.basename(file);
                    const quality = fileName.split('-').pop().replace('.mp4', '');
                    return [quality, `${fileName}`];
                })
            );

            await Promise.all(
                outputs.map(file => {
                    const fileName = path.basename(file);
                    const quality = fileName.split('-').pop().replace('.mp4', '');
                    return StrimData.create({
                        'name': req.body.name,
                        'quality': quality,
                        'video_url': fileName
                    })

                })
            );

            const delete_original_file = await fs.promises.unlink(inputPath);



            res.status(200).send({
                success: true,
                videos: videos
            });

        } catch (error) {
            console.error(error);
            res.status(500).send({
                success: false,
                message: error.message
            });
        }
    });


};


