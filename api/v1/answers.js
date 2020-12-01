const express = require("express");
const db = require("../../db");
const insertAnswer = require("../../queries/insertAnswer");
const router = express.Router();

// @route POST api/v1/answers
// @desc  create a new answer
// @access Public

router.post("/", (req, res) => {
   const answer = req.body;
   console.log("here's the answer: ", answer);
   db.query(insertAnswer, []).then().catch();
});

module.exports = router;
