const Image = require('../models/imageModel');
const User = require('../models/userModel');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadImage = async (req, res) => {
    const user = await User.findById(req.user._id);
    const folderName = `${user.name}_${user._id}`;

    const result = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
        folder: `photorealm/${folderName}`
    });

    const image = new Image({
        user: user._id,
        imageUrl: result.secure_url,
        cloudinaryId: result.public_id,
    });

    await image.save();

    res.json(image);
};


const removeImage = async (req, res) => {
    try {
        // Find the image by id
        const image = await Image.findById(req.params.id);

        if (!image) {
            return res.status(404).json({ message: 'Image not found' });
        }

        // Delete image from cloudinary
        await cloudinary.uploader.destroy(image.cloudinaryId);

        // Delete image from db
        await Image.deleteOne({ _id: req.params.id });

        res.json({ message: 'Image removed' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};



const getImages = async (req, res) => {
    const images = await Image.find({ user: req.user._id });
    res.json(images);
};

module.exports = {
    uploadImage,
    removeImage,
    getImages
};
