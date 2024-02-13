const express = require('express');
const cors = require('cors');
const colors = require('colors');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const cloudinary = require('./config/cloudinary');
const { errorHandler } = require('./middleware/errorMiddleware');
const userRoutes = require('./routes/userRoutes');
const imageRoutes = require('./routes/imagesRoutes');
const fileUpload = require('express-fileupload');
const port = process.env.PORT || 8080;

connectDB();

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload({
    useTempFiles:true//important
}));

app.use('/api/users', userRoutes);
app.use('/api/images', imageRoutes);

app.use(errorHandler);

app.listen(port, () => console.log(`PictoRealm server started on port ${port}`));
