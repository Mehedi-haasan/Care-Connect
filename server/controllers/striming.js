const db = require("../models");
const Strim = db.striming_data;
const fs = require('fs');
const path = require('path');
const Op = db.Sequelize.Op;

exports.CreateStrim = async (req, res) => {
    try {
        await Strim.create({
            name: req.body.name,
            video_url: req.body.video_url
        });

        res.status(200).send({
            success: true,
            message: "Video upload Successfully"
        })

    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }

}


exports.GetStrim = async (req, res) => {
    try {
        const data = await Strim.findAll({
            attributes: ['id', 'name','quality', 'video_url']
        });

        res.status(200).json({
            success: true,
            items: data
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


exports.StreamVideo = async (req, res) => {
    try {
        const video = await Strim.findByPk(req.params.id);


        if (!video) {
            return res.status(404).send('Video not found');
        }

        const videoPath = path.join(__dirname, '../uploads', video.video_url);
        console.log(videoPath)
        const stat = fs.statSync(videoPath);
        const fileSize = stat.size;
        const range = req.headers.range;

        if (range) {
            const parts = range.replace(/bytes=/, "").split("-");
            const start = parseInt(parts[0], 10);
            const end = parts[1]
                ? parseInt(parts[1], 10)
                : fileSize - 1;

            const chunkSize = (end - start) + 1;

            const file = fs.createReadStream(videoPath, {
                start,
                end
            });

            res.writeHead(206, {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunkSize,
                'Content-Type': 'video/mp4'
            });

            file.pipe(res);
        } else {
            res.writeHead(200, {
                'Content-Length': fileSize,
                'Content-Type': 'video/mp4'
            });

            fs.createReadStream(videoPath).pipe(res);
        }

    } catch (error) {
        res.status(500).send(error.message);
    }
};


