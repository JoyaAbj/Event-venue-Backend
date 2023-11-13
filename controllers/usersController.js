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

/*Get by Id*/
const getUserByID = async (req, res) => {
    try {
      const [result] = await db.query(`SELECT * FROM users WHERE ID = ?`, [
        req.params.id,
      ]);
      res.status(200).json({
        success: true,
        message: 'User retrieved successfully',
        data: result,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Unable to get user',
        error,
      });
    }
  };

  /*Add user*/
  const addUser = async (req, res) => {
    const {
      fullName,
      email,
      password,
      role
    } = req.body;
    
    try {
      const result = await db.query(
        `INSERT INTO users (fullName, email, password, role) VALUES (?,?,?,?);`,
        [fullName, email, password, role]
      );
  
      console.log(result);
      res.status(201).json({
        success: true,
        message: 'User added successfully',
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Unable to add new user',
        error,
      });
    }
  };

  /*Update User*/
  const updateUser = async (req,res) => {
    const { fullName, email, password, role } = req.body;
    const userId = req.params.id;
    try {
        const result = await db.query(
            `UPDATE users SET fullName=?, email=?, password=?, role=? WHERE ID=?`,
            [fullName, email, password, role, userId]
        );
        console.log(result);
        res.status(200).json({
            success: true,
            message: 'User updated successfully',
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: 'Unable to update user',
            error,
        })
        
    }
  };

  /*Delete User*/
  const deleteUser = async (req,res) => {
    try {
        const[result] = await db.query(
            `DELETE FROM users WHERE ID=?`,[
                req.params.id,
            ]
        );
        res.status(200).json({
            success: true,
            message:'User deleted successfully',
            data: result,
        });
        
    } catch (error) {
        res.status(400).json({
            success:false,
            message:'Unable to delete User',
            error,
        });
        
    }
  };

  /*login*/
  const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const [result] = await db.query(
            `SELECT ID, role, password FROM users WHERE email = ?`,
            [email]
        );

        if (!result || result.length === 0) {
            return res.status(401).json({
                success: false,
                message: 'User not found',
            });
        }

        const storedPassword = result[0].password;

        if (password !== storedPassword) {
            return res.status(401).json({
                success: false,
                message: 'Invalid password',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Login successfully',
            role: result[0].role,
            ID: result[0].ID,
        });

    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({
            success: false,
            message: 'Unable to log in',
            error: error.message,
        });
    }
};

module.exports = { getAllUsers, getUserByID, addUser, updateUser, deleteUser, loginUser };