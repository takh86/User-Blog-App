import connection from '../../DB/connection.js';

export const createBlog = (req,res)=>{
    const {title, content, user_id} =req.body;
    const statment = `SELECT id FROM users WHERE id= ?;`;
    connection.execute(statment,[user_id],(err, results)=>{
        if(err)
            return res.status(500).json({message: "Fail to execute SELECT the query"});
        if(results.length ===0)
            return res.status(404).json({message : "User not found"})
        const query = `INSERT INTO blogs (title, content, user_id) VALUES (?,?,?);`;
        connection.execute(query,[title,content,user_id],(err,results)=>{
            if(err)
                return res.status(500).json({message: "Fail to excute the query"});
            return res.status(201).json({message: "Blog created successfully", date: results});
        });     
    })
};

export const updateBlog = (req,res)=>{
    const {blogId} = req.params;
    const {title,user_id} = req.body;

    // check if user exists
    const statment = `SELECT first_name FROM users WHERE id = ?;`;
    connection.execute(statment,[user_id],(err, results)=>{
        if(err) return res.status(500).json({message: "Fail to execute SELECT query"});
        if(results.length ===0)
            return res.status(404).json({message: "User not found"});

        // check if blog exist
        const blogStatment = `SELECT * FROM blogs WHERE id = ?;`;
        connection.execute(blogStatment,[blogId],(err, results)=>{
            if(err) return res.status(500).json({message: "Fail to execute SELECT query"});
            if(results.length ===0)
                return res.status(404).json({message: "Blog not found"});
            // check if user is the owner of the blog
            if(results[0].user_id == user_id){
                // update blog
                const updateStatment = `UPDATE blogs SET title = ? WHERE id = ? AND user_id = ?;`;
                connection.execute(updateStatment,[title, blogId, user_id],(err, results)=>{
                    if(err) return res.status(500).json({message: "Fail to execute UPDATE query"});
                    if(results.affectedRows ===0)
                        return res.status(400).json({message: "Blog update failed"});
                    return res.status(200).json({message: "Blog updated successfully", data: results});
                });
            } else {
                return res.status(401).json({message: "You are not authorized to update this blog"});
            }
            
        });
    });
};
export const deleteBlog = (req,res)=>{
    const {blogId} = req.params;
    const {user_id} = req.body;
    connection.execute(`SELECT first_name FROM users WHERE id = ?;`,[user_id],(err, results)=>{
        if(err) return res.status(500).json({message: "Fail to execute SELECT query",err: err.message});
        if(results.length ===0)
            return res.status(404).json({message: "User not found"});
        // check if blog exist
        connection.execute(`SELECT * FROM blogs WHERE id = ?;`,[blogId],(err, results)=>{
            if(err) return res.status(500).json({message: "Fail to execute SELECT query",error: err.message});
            if(results.length ===0)
                return res.status(404).json({message: "Blog not found"});
            // check if user is the owner of the blog
            if(user_id == results[0].user_id){
                connection.execute(`DELETE FROM blogs WHERE id = ? AND user_id = ?;`,[blogId, user_id],(err, results)=>{
                    if(err) return res.status(500).json({message: "Fail to execute DELETE query",err: err.message});
                    if(results.affectedRows ===0)
                        return res.status(400).json({message: "Blog delete failed"});
                    return res.status(200).json({message: "Blog deleted successfully", data: results});
                });
            }else {
                return res.status(401).json({message: "You are not authorized to delete this blog"});
            }
        });
    });
};
export const getAllBlogs = (req,res)=>{
    connection.execute(`SELECT * FROM blogs;`,[],(err, results)=>{
        if(err) return res.status(500).json({message: "Fail to execute SELECT query", err: err.message});
        return res.status(200).json({message: "Blogs retrieved successfully", data: results});
    });
};
export const getBlogById = (req,res)=>{
    const {blogId} = req.params;
    connection.execute(`SELECT * FROM blogs WHERE id = ?;`,[blogId],(err, results)=>{
        if(err) return res.status(500).json({message: "Fail to execute SELECT query", err: err.message});
        if(results.length === 0) return res.status(404).json({message: "Blog not found"});
        return res.status(200).json({message: "Blog retrieved successfully", data: results[0]});
    });
};