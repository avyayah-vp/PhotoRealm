const express = require('express');
const router = express.Router();
const { uploadImage, removeImage, getImages } = require('../controllers/imageController');
const { protect } = require('../middleware/authMiddleware');

router.post('/upload', protect, uploadImage);
router.delete('/delete/:id', protect, removeImage);
router.get('/', protect, getImages);

module.exports = router;
