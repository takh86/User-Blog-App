import mysql from 'mysql2';
const connection = mysql.createConnection({
    host : 'localhost',
    port : 3306,
    user : 'root',
    password : 'root',
    database : 'blog_app'
});

connection.connect((err)=>{
    if(err) return console.log(err.message);
    console.log('Connected to the MySQL database.');
}); 
export default connection;