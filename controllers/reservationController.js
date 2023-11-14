const db = require('../config/db');

/*Get All reservations*/
const getAllReservations = async (req, res) => {
    try {
     const getAllReservations = 'SELECT * FROM reservation';
     const [result] = await db.query(getAllReservations);
     res.status(200).json(result);
    } catch (error) {
     console.error(error);
     res.status(500).json({ message: 'Error fetching reservations' });
    }
 };

 /*Get reservation by ID*/
 const getReservationbyId = async (req, res) => {
    const { id } = req.params;
    const getReservation = 'SELECT * FROM reservation WHERE id = ?';

    try {
        const [result] = await db.query(getReservation, [id]);
        if (result.length === 0) {
            return res.status(404).json({ message: 'Reservation not found' });
        }
        return res.json(result[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error fetching reservation' });
    }
 };

 /*delete reservation*/
 const deleteReservation = async (req, res) => {
    try {
      const [result] = await db.query(
        'DELETE FROM reservation WHERE id = ?',
        [req.params.id]
      );
  
      console.log(result);
      
      if (result.affectedRows > 0) {
        res.status(204).json({
          success: true,
          message: 'Reservation deleted successfully',
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'Reservation not found',
        });
      }
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Unable to delete the reservation',
        error: error.message
      });
    }
  };
 
  /*add reservation*/
  const addReservation = async (req,res) => {
    const {eventID, userID} = req.body;
    try{
        const result = await db.query(
            `INSERT INTO reservation(eventID, userID) VALUES (?,?)`, 
            [eventID, userID]
        );
        console.log(result);
        res.status(201).json({
            success: true,
            message: 'Reservation added successfully',
          });
        } catch (error) {
            res.status(400).json({
              success: false,
              message: 'Unable to add new reservation',
              error,
            });
          }
        };
/*getAll by UserID*/
        const getAllReservationByUserID = async (req, res) => {
            try {
              const [result] = await db.query(`SELECT * FROM reservation WHERE userID = ?`, [
                req.params.id,
              ]);
              res.status(200).json({
                success: true,
                message: 'Data retrieved successfully',
                data: result,
              });
            } catch (error) {
              res.status(400).json({
                success: false,
                message: 'Unable to get data',
                error,
              });
            }
          };
        /*getAllReservationByEventID*/
          const getAllReservationByEventID = async (req, res) => {
            try {
              const [result] = await db.query(`SELECT * FROM reservation WHERE eventID = ?`, [
                req.params.id,
              ]);
              res.status(200).json({
                success: true,
                message: 'Data retrieved successfully',
                data: result,
              });
            } catch (error) {
              res.status(400).json({
                success: false,
                message: 'Unable to get data',
                error,
              });
            }
          };

 module.exports = { getAllReservations, getReservationbyId, deleteReservation, addReservation, getAllReservationByUserID, getAllReservationByEventID };
