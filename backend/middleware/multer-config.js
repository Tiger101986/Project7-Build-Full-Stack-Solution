/**
 * install multer package
 * import multer pacakage to upload image files
 */
 const multer = require('multer');

 //file type of image
 const MIME_TYPES = {
     'image/jpg': 'jpg',
     'image/jpeg': 'jpg',
     'image/png': 'jpg',
     "audio/mpeg": "mp3",
     "video/mp4": "mp4"
 };
 
 const storage = multer.diskStorage({
     destination: (req, file, callback) => {
         callback(null, 'images');
     },
     filename: (req, file, callback) => {
         const name = file.originalname.split(' ').join('_');
         const extension = MIME_TYPES[file.mimetype];
         callback(null, name + Date.now() + '.' + extension);
     }
 });
 
 module.exports = multer({storage: storage}).single('image');