const express = require('express');
const router = express.Router();
const multer = require('multer');

const { getVenuebyId, getAllVenues, addVenue, updateVenue, deleteVenue} = require('../controllers/venuesController');
const storage = multer.memoryStorage(); 
  const upload = multer({ storage: storage });

router.get('/get/:id', getVenuebyId);
router.get('/getAll', getAllVenues);
router.post('/add', upload.single('image'), addVenue);
router.put('/update/:id',  upload.single('image'),  updateVenue);
router.delete('/delete/:id', deleteVenue);


module.exports = router;