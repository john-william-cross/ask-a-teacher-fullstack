const express = require("express");
const router = express.Router();
const db = require("../../db");
const insertAnswer = require("../../queries/insertAnswer");
const { toSafeParse } = require("../../utils/helpers");

router.post((answer, res) => {
   const { id, text, answeredAt, userId, questionId } = answer;

   console.log("here is the answer: ", answer);
   db.query(insertAnswer, answer)
      .then(() => {
         console.log(answer);
         res.json(answer);
      })
      .catch((err) => {
         console.log(err);
         res.status(400).json(err);
      });
});

module.exports = router;
