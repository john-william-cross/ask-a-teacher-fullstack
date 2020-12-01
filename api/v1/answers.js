const express = require("express");
const db = require("../../db");
const insertAnswer = require("../../queries/insertAnswer");
const router = express.Router();

// @route POST api/v1/answers
// @desc  create a new answer
// @access Public

router.post("/", (req, res) => {
   const answer = {
      id: req.body.id,
      text: req.body.text,
      answered_at: req.body.answeredAt,
      user_id: req.body.userId,
      question_id: req.body.questionId,
   };
   console.log("here's the answer: ", answer);
   db.query(insertAnswer, answer).then().catch();
});

module.exports = router;
