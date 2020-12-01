const express = require("express");
const router = express.Router();

// @route POST api/v1/answers
// @desc  create a new answer
// @access Public

router.post("/", (req, res) => {
   console.log("here's the body: ", req.body);
});

module.exports = router;
