const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'your_cloudinary_cloud_name',
  api_key: 'your_cloudinary_api_key',
  api_secret: 'your_cloudinary_api_secret'
});

module.exports = cloudinary;