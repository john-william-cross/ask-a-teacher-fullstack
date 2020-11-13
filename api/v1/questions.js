// This file represents the questions resource
const express = require("express");
const router = express.Router();
const db = require("../../db");
const selectQuestions = require("../../queries/selectQuestions");
const { toJson, toSafeParse } = require("../../utils/helpers");

// @route       GET api/v1/questions
//@desc         Get all the questions by desc order
//@access       PUBLIC

router.get("/", (req, res) => {
   console.log(req.query);
   const { order } = req.query;

   /* https://www.npmjs.com/package/mysql#escaping-query-values */
   db.query(selectQuestions, [order])
      .then((dbRes) => {
         const questions = toSafeParse(toJson(dbRes));
         res.json(dbRes);

         console.log(`HERE ARE THE QUESTIONS: `, questions);

         // const questionData = questions.map((questionKey) => {
         //    return questionKey.question_text;
         // });
         // console.log(questionData);

         const answers = questions.map((question) => {
            question.answers = [];
            return questions;
         });

         console.log(answers);
         // console.log(`Here are the unique questions: `, [
         //    ...new Set(questionData),
         // ]);
      })
      .catch((err) => {
         console.log(err);
         res.status(400).json(err);
      });
});

module.exports = router;
