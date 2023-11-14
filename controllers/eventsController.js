const db = require('../config/db');

/*Get All Events*/
const getAllEvents = async (req, res) => {
    try {
     const getAllEvents = 'SELECT * FROM events';
     const [result] = await db.query(getAllEvents);
     res.status(200).json(result);
    } catch (error) {
     console.error(error);
     res.status(500).json({ message: 'Error fetching events' });
    }
 };

 /*get by Id*/
 const getEventbyId = async (req, res) => {
    const { id } = req.params;
    const getEvent = 'SELECT * FROM events WHERE id = ?';

    try {
        const [result] = await db.query(getEvent, [id]);
        if (result.length === 0) {
            return res.status(404).json({ message: 'Event not found' });
        }
        return res.json(result[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error fetching event' });
    }
 };
 
 /*add event*/
 const addEvent = async (req,res) => {
    const {title, eventDate, ticketPrice, eventDescription, venueID} = req.body;
    try{
        const result = await db.query(
            `INSERT INTO events (title, eventDate, ticketPrice, eventDescription, venueID) VALUES (?,?,?,?,?)`, 
            [title, eventDate, ticketPrice, eventDescription, venueID]
        );
        console.log(result);
        res.status(201).json({
            success: true,
            message: 'Event added successfully',
          });
        } catch (error) {
            res.status(400).json({
              success: false,
              message: 'Unable to add new event',
              error,
            });
          }
        };

    /*Update Event*/
    const updateEvent = async (req, res) => {
        const {title, eventDate, ticketPrice, eventDescription, venueID} = req.body;
    try{
        const result = await db.query(
            `UPDATE events SET title=?, eventDate=?, ticketPrice=?, eventDescription=?, venueID=? WHERE id = ?`, [
                title, eventDate, ticketPrice, eventDescription, venueID, req.params.id
            ]);
            
        
        console.log(result);
        res.status(201).json({
            success: true,
            message: 'Event updated successfully',
          });
        } catch (error) {
            res.status(400).json({
              success: false,
              message: 'Unable to update the event',
              error,
            });
          }
        };

    /*Delete Event*/
    const deleteEvent = async (req, res) => {
        try {
          const [result] = await db.query(
            'DELETE FROM events WHERE id = ?',
            [req.params.id]
          );
      
          console.log(result);
          
          if (result.affectedRows > 0) {
            res.status(204).json({
              success: true,
              message: 'Event deleted successfully',
            });
          } else {
            res.status(404).json({
              success: false,
              message: 'Event not found',
            });
          }
        } catch (error) {
          res.status(400).json({
            success: false,
            message: 'Unable to delete the event',
            error: error.message
          });
        }
      };


 module.exports = { getAllEvents, getEventbyId, addEvent, updateEvent, deleteEvent };