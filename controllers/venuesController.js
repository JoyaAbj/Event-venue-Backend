const db = require('../config/db');
const cloudinaryConfig = require('../config/cloudinary');
const cloudinary = require('cloudinary').v2;

/*Get venue by Id*/
const getVenuebyId = async (req, res) => {
    const { id } = req.params;
    const getVenue = 'SELECT * FROM venues WHERE id = ?';

    try {
        const [result] = await db.query(getVenue, [id]);
        if (result.length === 0) {
            return res.status(404).json({ message: 'Venue not found' });
        }
        return res.json(result[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error fetching Venue' });
    }
 };

 /*Get all venues*/
 const getAllVenues = async (req, res) => {
    try {
     const getAllVenues = 'SELECT * FROM venues';
     const [result] = await db.query(getAllVenues);
     res.status(200).json(result);
    } catch (error) {
     console.error(error);
     res.status(500).json({ message: 'Error fetching venues' });
    }
 };

 

/*Add Venue*/
const addVenue = async (req, res) => {
    const {
      name,
      description,
      capacity,
      address
    } = req.body;
  
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'Image not provided',
        });
      }
      const imageBuffer = req.file.buffer.toString('base64');
      const imageResult = await cloudinary.uploader.upload(`data:image/png;base64,${imageBuffer}`, {
        folder: 'venues', 
      });
  
      const result = await db.query(
        `INSERT INTO venues (name, description, capacity, image, address) VALUES (?,?,?,?,?);`,
        [name, description, capacity, imageResult.secure_url, address]
      );
  
      console.log(result);
      res.status(201).json({
        success: true,
        message: 'Data added successfully',
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({
        success: false,
        message: 'Unable to add new data',
        error: error.message, 
      });
    }
  };
  /*update Venue*/
 const updateVenue = async (req, res) => {
    const { name, description, capacity, address } = req.body;
    const VenueId = req.params.id;
  
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'Image not provided',
        });
      }
  
      const imageBuffer = req.file.buffer.toString('base64');
      const imageResult = await cloudinary.uploader.upload(`data:image/png;base64,${imageBuffer}`, {
        folder: 'venues', 
      });
  
      
      const result = await db.query(
        `UPDATE venues SET name = ?, description = ?, capacity = ?, image = ?, address = ? WHERE ID = ?`,
        [name, description, capacity, imageResult.secure_url, address, VenueId]
      );
  
      console.log(result);
      res.status(200).json({
        success: true,
        message: 'Data updated successfully',
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({
        success: false,
        message: 'Unable to update data',
        error: error.message, 
      });
    }
  };

  /*Delete Venue*/
  const deleteVenue = async (req, res) => {
    try {
      const [result] = await db.query(
        'DELETE FROM venues WHERE id = ?',
        [req.params.id]
      );
  
      console.log(result);
      
      if (result.affectedRows > 0) {
        res.status(204).json({
          success: true,
          message: 'Venue deleted successfully',
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'Venue not found',
        });
      }
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Unable to delete the venue',
        error: error.message
      });
    }
  };

 module.exports = { getVenuebyId, getAllVenues, addVenue, updateVenue, deleteVenue};