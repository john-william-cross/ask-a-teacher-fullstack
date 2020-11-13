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

         questionsWithAnswersProp = questions.map((question) => {
            question.answers = [];
            return questions;
            // this is creating another array layer around the questions array; it also outputs 36 question objects because it's returning all questions each time it maps over questions.

            // returning just question.answers = [] doesn't work
            // nested for loop needed?

            // I want a prop called answers for each question object in questions array
            // push answer_text into the answers array
         });

         console.log("\n\nAdded answers prop: ", questionsWithAnswersProp);
      })
      .catch((err) => {
         console.log(err);
         res.status(400).json(err);
      });
});

module.exports = router;
