// This file represents the questions resource
const express = require("express");
const router = express.Router();
const db = require("../../db");
const selectQuestions = require("../../queries/selectQuestions");

// @route       GET api/v1/questions
//@desc         Get all the questions by desc order
//@access       PUBLIC

router.get("/", (req, res) => {
   db.query(selectQuestions("`questions`.`created_at` DESC"));
   console
      .log(req.query)
      .then((dbRes) => {
         res.json(dbRes);
      })
      .catch((err) => {
         console.log(err);
         res.status(400).json(err);
      });
});

module.exports = router;
