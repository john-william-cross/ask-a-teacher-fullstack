require("dotenv").config();
const mysql = require("mysql");

const connection = mysql.createConnection({
   host: process.env.RDS_HOST,
   user: process.env.RDS_USER,
   password: process.env.RDS_PASSWORD,
   database: "ask_a_teacher_app",
});

connection.connect();

connection.query(
   `
    SELECT 
        id, 
        email, 
        created_at 
    FROM 
        users 
    WHERE 
        email = 'mike@nv.ccsd.net' 
    AND 
        password = 'mikmikmik' 
    LIMIT 1
   `,

   (err, res) => {
      if (err) {
         console.log(err);
      } else {
         console.log(res);
      }
   }
);

connection.end();
