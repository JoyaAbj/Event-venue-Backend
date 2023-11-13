const db = require('../config/db');

/*Get All Users*/
const getAllUsers = async (req, res) => {
   try {
    const getAllUsers = 'SELECT * FROM users';
    const [result] = await db.query(getAllUsers);
    res.status(200).json(result);
   } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching users' });
   }
};



module.exports = { getAllUsers };