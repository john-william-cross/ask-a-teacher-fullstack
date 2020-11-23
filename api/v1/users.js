// This file represents the users resource
const express = require("express");
const router = express.Router();
const db = require("../../db");
const insertUser = require("../../queries/insertUser");
const selectUserById = require("../../queries/selectUserById");
const { toHash } = require("../../utils/helpers");
const getSignUpEmailError = require("../../validation/getSignUpEmailError");
const getSignUpPasswordError = require("../../validation/getSignUpPasswordError");

// @route       POST api/v1/users
// @desc        create a new user
// @access      PUBLIC
router.post("/", async (req, res) => {
   const { id, email, password, createdAt } = req.body;
   const emailError = await getSignUpEmailError(email);
   console.log(`Here is the Email Error: `, emailError);
   const passwordError = getSignUpPasswordError(password, email);
   let dbError = "";
   if (emailError === "" && passwordError === "") {
      const user = {
         id,
         email,
         home_state: getHomeState(email),
         password: await toHash(password),
         created_at: createdAt,
      };

      db.query(insertUser, user)
         .then(() => {
            db.query(selectUserById, id)
               .then((users) => {
                  const user = users[0];
                  res.status(200).json({
                     id: user.id,
                     email: user.email,
                     createdAt: user.created_at,
                  });
               })
               .catch((err) => {
                  console.log(err);
                  dbError = `${err.code} ${err.sqlMessage}`;
                  res.status(400).json({ dbError });
               });
         })
         .catch((err) => {
            console.log(err);
            dbError = `${err.code} ${err.sqlMessage}`;
            res.status(400).json({ dbError });
         });
   } else {
      res.status(400).json({ emailError, passwordError });
   }
});

// @route       POST api/v1/users/auth
// @desc        check this user against the db via email and password
// @access      PUBLIC

router.post("/auth", async (req, res) => {
   const { email, password } = req.body;
   const emailError = getLoginEmailError(email);
   // console.log(`Here is the Email Error: `, emailError);
   const passwordError = getLoginPasswordError(password, email);
   let dbError = "";
});

module.exports = router;

function getHomeState(email) {
   if (email.includes("nv")) {
      return "Nevada";
   } else {
      return "";
   }
}
