// This file represents the questions resource
const express = require("express");
const router = express.Router();
const db = require("../../db");
const selectQuestions = require("../../queries/selectQuestions");
const { toJson, toSafeParse } = require("../../utils/helpers");
const uniqBy = require("lodash/uniqBy");

// @route       GET api/v1/questions
//@desc         Get all the questions by desc order
//@access       PUBLIC

router.get("/", (req, res) => {
   console.log(req.query);
   const { order } = req.query;

   /* https://www.npmjs.com/package/mysql#escaping-query-values */
   db.query(selectQuestions, [order])
      .then((dbRes) => {
         const questionsAndAnswers = toSafeParse(toJson(dbRes));

         // console.log(`HERE ARE THE AndAnswers: `, questions);

         // const questionData = questions.map((questionKey) => {
         //    return questionKey.question_text;
         // });
         // console.log(questionData);

         const questions = questionsAndAnswers.map((question) => {
            return {
               id: question.question_id,
               text: question.question_text,
               createdAt: question.question_created_at,
               answers: [],
            };
         });

         console.log(questions);

         const uniqQuestions = uniqBy(questions, `id`);

         questionsAndAnswers.forEach((questionAndAnswer) => {
            // looking at each questionAndAnswer
            // find the question that matches this questionAndAnswer from uniqQuestions
            const question = uniqQuestions.find((question) => {
               return question.id === questionAndAnswer.question_id;
            });
            console.log(`questionAndAnswer: `, questionAndAnswer);
            // console.log(`Here is a question: `, question);
            question.answers = question.answers.concat({
               id: questionAndAnswer.answer_id,
               text: questionAndAnswer.answer_text,
               answeredAt: questionAndAnswer.answered_at,
               userId: questionAndAnswer.user_id,
               //TODO add home state
            });
         });
         console.log(`Here are the UNIQ QUESTIONS: `, uniqQuestions);
         res.json(uniqQuestions);
      })
      .catch((err) => {
         console.log(err);
         res.status(400).json(err);
      });
});

module.exports = router;
