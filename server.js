require("dotenv").config();
const express = require("express");
const app = express();
const mysql = require("mysql");
const selectUser = require("./queries/selectUser");
const { toJson, toSafeParse } = require("./utils/helpers");

const connection = mysql.createConnection({
   host: process.env.RDS_HOST,
   user: process.env.RDS_USER,
   password: process.env.RDS_PASSWORD,
   database: "ask_a_teacher_app",
});

connection.connect();

connection.query(selectUser("mike@nv.ccsd.net", "mikmikmik"), (err, res) => {
   if (err) {
      console.log(err);
   } else {
      //   const user = toSafeParse(toJson(res))[0]; //res is response //calling this user instead of users even though it's an array because we are only returning the first one in the array
      const jsonRes = toJson(res);
      console.log(`This is now a string: `, jsonRes);
      const parsedRes = toSafeParse(jsonRes);
      console.log(`Here is the parsedRes: `, parsedRes);
      const firstObj = parsedRes[0];
      const user = firstObj;
      console.log(`here is just the user: `, user);
   }
});

//if you collect anything else from the user, return that as well, because this is all going to be stored inside of our redux state

app.get("/", (req, res) => {
   res.send("Hello World!");
});

connection.end();

const port = process.env.PORT || 3040;
app.listen(port, () => {
   console.log(`Server Running at http://localhost:${port}`);
});

//convert a RowDataPacket to a standard object: 31 minutes into 340A
