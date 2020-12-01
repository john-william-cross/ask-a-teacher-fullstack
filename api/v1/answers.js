const express = require("express");
const router = express.Router();

// @route POST api/v1/answers
// @desc  create a new answer
// @access Public

router.post("/", (req, res) => {
   const answer = req.body;
   console.log("here's the answer: ", answer);
});

module.exports = router;
