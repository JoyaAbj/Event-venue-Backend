const express = require('express');
const router = express.Router();

const {  getAllReservations, addReservation, deleteReservation, getReservationbyId, getAllReservationByUserID,getAllReservationByEventID} = require('../controllers/reservationController');

router.get('/get/:id', getReservationbyId);
router.get('/getAll', getAllReservations);
router.get('/getByUser/:id', getAllReservationByUserID);
router.get('/getByEvent/:id', getAllReservationByEventID);
router.post('/add', addReservation);
router.put('/update/:id', updateEvent);
router.delete('/delete/:id', deleteReservation)

module.exports = router;