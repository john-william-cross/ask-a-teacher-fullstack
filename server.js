const express = require("express");
const app = express();
var cors = require("cors");

app.use(cors());

app.use("/api/v1/users", require("./api/v1/users"));
app.use("/api/v1/questions", require("./api/v1/questions"));
// eventually a route for posting a question
console.log(app.use("/api/v1/questions", require("./api/v1/questions")));
app.get("/", (req, res) => {
   res.send("Hello World!!!!");
});

const port = process.env.PORT || 3040;
app.listen(port, () => {
   console.log(`Server Running at http://localhost:${port}`);
});

// this server file is going to be a list of all our routes, then it's going to start the server that's listening on that port
// when the route -- app.use("/api/v1/users", require("./api/v1/users")); -- what's inside of the users.js file will run.... which is, it will open up a database connection (db, defined in db.js), run the query method on it, then selectUser based off of the requirements in selectUser.js. It's returned as JSON, which is when the user is able to access it inside their web browser
