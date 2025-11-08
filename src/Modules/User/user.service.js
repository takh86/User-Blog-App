import connection from '../../DB/connection.js';

export const getUserById = (req, res) => {
    connection.execute(`SELECT * FROM users WHERE id =?;`,[req.params.id],(err, results)=>{
        if(err){
            return res.status(500).json({message: "Error fetching users",error: err.message});
        }
        return res.status(200).json({message: "Users fetched successfully", results});
    });
};
export const signup = (req, res)=>{
    const { first_name,last_name,email,password, confirmPassword,gender,DOB }= req.body;
    if(password !== confirmPassword){
        return res.status(400).json({message: "Password mismatch"});
    }
    const query = `SELECT * FROM users WHERE email = ?;`;
    connection.execute(query,[email],(err, results)=>{
        if(err){
            return res.status(500).json({message: "Error checking existing user", error: err.message});
        }
        if(results.length > 0){
            return res.status(409).json({message: "User already exists"});
        }

        // Insert user
        const insertQuery = `INSERT INTO users (first_name, last_name, email, password, gender, DOB) VALUES (?, ?, ?, ?, ?, ?);`;
        connection.execute(insertQuery,[first_name,last_name,email,password,gender,DOB],(err, results)=>{
            if(err){
                return res.status(500).json({message: "Error inserting user", error: err.message});
            }
            return res.status(201).json({message: "User registered successfully", results});
        });
    });
};
export const login = (req, res)=>{
    const {email,password}= req.body;

    const query = `SELECT * FROM users WHERE email = ? AND password = ?;`;
    connection.execute(query,[email,password],(err, results)=>{
        if(err){
            return res.status(500).json({message: "Error checking existing user", error: err.message});
        }
        if(results.length == 0){
            return res.status(404).json({message: "Invalid email or password"});
        }

    return res.status(200).json({message: "Login successful", results});
    });
};
export const getSpecificUser = (req, res) => {
    const id = req.params.id;
    connection.execute(`SELECT email, first_name, last_name, gender, DOB, YEAR(CURDATE()) - YEAR(DOB) AS age FROM users WHERE id =?;`,[id],(err, results)=>{
        if(err){
            return res.status(500).json({message: "Error fetching users",error: err.message});
        }
        if(results.length > 0){
            return res.status(200).json({message: "User profile fetched successfully", results});
        }
        return res.status(404).json({message: "User not found"});
    });
};
export const updateUser = (req, res) => {
    const {id}= req.params;
    const {first_name,last_name}= req.body;

    connection.execute(`UPDATE users SET first_name = ?, last_name = ? WHERE id = ?;`,[first_name,last_name,id],(err, results)=>{
        if(err){
            return res.status(500).json({message: "Error fetching users",error: err.message});
        }
        if(results.affectedRows > 0){
            return res.status(200).json({message: "User updated successfully", results});
        }
        return res.status(404).json({message: "User not found"});
    });
};
export const deleteUser = (req, res) => {
    const {id}= req.params;

    connection.execute(`DELETE FROM users WHERE id = ?;`,[id],(err, results)=>{
        if(err){
            return res.status(500).json({message: "Error fetching users",error: err.message});
        }
        if(results.affectedRows > 0){
            return res.status(200).json({message: "User deleted successfully", results});
        }
        return res.status(404).json({message: "User not found"});
    });
};
export const searchUser = (req, res) => {
    const {first_name}= req.query;
    connection.execute(`SELECT * FROM users WHERE first_name = ?`,[first_name],(err, results)=>{
        if(err){
            return res.status(500).json({message: "Error fetching users",error: err.message});
        }
        if(results.length > 0){
            return res.status(200).json({message: "done successfully", results});
        }
        return res.status(404).json({message: "No users found"});
    });
};
