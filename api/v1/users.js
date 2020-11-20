// This file represents the users resource
const express = require("express");
const router = express.Router();
const db = require("../../db");
const insertUser = require("../../queries/insertUser");
const selectUser = require("../../queries/selectUser");
const { toJson, toSafeParse, toHash } = require("../../utils/helpers");

// @route       GET api/v1/users
// @desc        Get a valid user via email and password
// @access      PUBLIC

router.get("/", (req, res) => {
   db.query(selectUser("john@nv.ccsd.net", "johjohjoh"))
      .then((dbRes) => {
         const user = toSafeParse(toJson(dbRes))[0];
         console.log(user);
         res.json(user);
      })
      .catch((err) => {
         console.log(err);
         res.status(400).json(err);
      });
});

// @route       POST api/v1/users
// @desc        create a new user
// @access      PUBLIC
router.post("/", async (req, res) => {
   const hashedPassword = await toHash(req.body.password);
   const user = {
      id: req.body.id,
      email: req.body.email,
      home_state: getHomeState(req.body.email),
      password: hashedPassword,
      created_at: req.body.createdAt,
   };

   console.log(`Here's the user just created: `, user);

   db.query(insertUser, user)
      .then((dbRes) => {
         console.log(dbRes);
      })
      .catch((err) => {
         console.log(err);
      });
   // create function to check for state (grab from email)
});

module.exports = router;

// user.home_state = getHomeState(user.email);

function getHomeState(email) {
   if (email.includes("nv")) {
      return "I miss breakfast pizza.";
   } else {
      return "";
   }
}
