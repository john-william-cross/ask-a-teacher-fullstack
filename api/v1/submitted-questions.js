const express = require("express");
const db = require("../../db");
const insertQuestion = require("../../queries/insertQuestion");
const router = express.Router();

// @route POST api/v1/submitted-questions
// @desc  create a new answer
// @access Public

router.post("/", (req, res) => {
   const submittedQuestion = {
      id: req.body.id,
      text: req.body.text,
      email: req.body.email,
      created_at: req.body.createdAt,
   };
   console.log("here's the submitted question: ", submittedQuestion);
   db.query(insertQuestion, submittedQuestion).then().catch();
});

module.exports = router;
