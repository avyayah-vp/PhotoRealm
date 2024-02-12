const mongoose = require('mongoose');

const imageSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'user',
        },
        imageUrl: {
            type: String,
            required: [true, 'Please add an image URL'],
        },
        cloudinaryId: {
            type: String,
            required: [true, 'Please add a Cloudinary ID'],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Image', imageSchema);
