// This file represents the users resource
const express = require("express");
const router = express.Router();
const db = require("../../db");
const selectUser = require("../../queries/selectUser");
const { toJson, toSafeParse } = require("../../utils/helpers");

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
router.post("/", (req, res) => {
   console.log("hit api");
   console.log(req.body);
});

module.exports = router;
