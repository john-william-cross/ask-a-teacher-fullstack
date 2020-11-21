// This file represents the users resource
const express = require("express");
const router = express.Router();
const db = require("../../db");
const insertUser = require("../../queries/insertUser");
const { toHash } = require("../../utils/helpers");
const getSignUpEmailError = require("../../validation/getSignUpEmailError");
const getSignUpPasswordError = require("../../validation/getSignUpPasswordError");

// @route       POST api/v1/users
// @desc        create a new user
// @access      PUBLIC
router.post("/", async (req, res) => {
   const { id, email, password, createdAt } = req.body;
   const emailError = await getSignUpEmailError(
      "dolphdddssdi234234n@nv.ccsd.net"
   );
   console.log(`Here is the Email Error: `, emailError);
   const passwordError = getSignUpPasswordError(password);
   if (emailError === "" && passwordError === "") {
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
            res.status(400).json({ emailError, passwordError });
         });
   } else {
      res.status(400).json({ emailError, passwordError });
   }
});

module.exports = router;

function getHomeState(email) {
   if (email.includes("nv")) {
      return "Nevada";
   } else {
      return "";
   }
}
