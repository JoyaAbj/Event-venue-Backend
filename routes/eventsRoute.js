const express = require('express');
const router = express.Router();

const { getEventbyId, getAllEvents, addEvent, updateEvent, deleteEvent} = require('../controllers/eventsController');

router.get('/get/:id', getEventbyId);
router.get('/getAll', getAllEvents);
router.post('/add', addEvent);
router.put('/update', updateEvent);
router.delete('/delete/:id', deleteEvent)

module.exports = router;