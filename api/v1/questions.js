// This file represents the questions resource
const express = require("express");
const router = express.Router();
const db = require("../../db");
const selectQuestions = require("../../queries/selectQuestions");
const { toJson, toSafeParse } = require("../../utils/helpers");
const uniqBy = require("lodash/uniqBy");
const validateJwt = require("../../utils/validateJwt");

// @route       GET api/v1/questions
//@desc         Get all the questions by desc order
//@access       private

router.get("/", validateJwt, (req, res) => {
   // console.log(req.query);
   const { order } = req.query;
   // const userId = req.user.id;
   // 28 minutes into 360, ask question about if I need this...

   /* https://www.npmjs.com/package/mysql#escaping-query-values */
   db.query(selectQuestions, [order])
      .then((questions) => {
         const questionsAndAnswers = toSafeParse(toJson(questions));

         const camelCasedQuestionsAndAnswers = questionsAndAnswers.map(
            (question) => {
               return {
                  id: question.question_id,
                  text: question.question_text,
                  createdAt: question.question_created_at,
                  answers: [],
               };
            }
         );

         // console.log(camelCasedQuestionsAndAnswers);

         const uniqQuestions = uniqBy(camelCasedQuestionsAndAnswers, `id`);

         questionsAndAnswers.forEach((questionAndAnswer) => {
            // looking at each questionAndAnswer
            // find the question that matches this questionAndAnswer from uniqQuestions
            const question = uniqQuestions.find((question) => {
               return question.id === questionAndAnswer.question_id;
            });
            // console.log(`questionAndAnswer: `, questionAndAnswer);
            // console.log(`Here is a question: `, question);
            question.answers = question.answers.concat({
               id: questionAndAnswer.answer_id,
               text: questionAndAnswer.answer_text,
               answeredAt: questionAndAnswer.answered_at,
               userId: questionAndAnswer.user_id,
               userHomeState: questionAndAnswer.user_home_state,
            });
         });
         // console.log(`Here are the UNIQ QUESTIONS: `, uniqQuestions);
         res.json(uniqQuestions);
      })
      .catch((err) => {
         console.log(err);
         res.status(400).json(err);
      });
});

module.exports = router;
