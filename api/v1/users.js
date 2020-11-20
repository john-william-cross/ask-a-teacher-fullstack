// This file represents the users resource
const express = require("express");
const router = express.Router();
const db = require("../../db");
const insertUser = require("../../queries/insertUser");
const { toJson, toSafeParse, toHash } = require("../../utils/helpers");

// @route       POST api/v1/users
// @desc        create a new user
// @access      PUBLIC
router.post("/", async (req, res) => {
   const { id, email, password, createdAt } = req.body;
   // const emailError = getSignUpEmailError(email);
   const user = {
      id,
      email,
      home_state: getHomeState(email),
      password: await toHash(password),
      created_at: createdAt,
   };

   db.query(insertUser, user)
      .then((dbRes) => {
         console.log(dbRes);
         // return the user data so we can put in redux store
      })
      .catch((err) => {
         console.log(err);
         // return a 400 error to user
      });
});

module.exports = router;

function getHomeState(email) {
   if (email.includes("nv")) {
      return "Nevada";
   }
   if (email.includes("dmschools.org")) {
      return "Iowa";
   } else {
      ("");
   }
}
