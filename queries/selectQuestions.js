module.exports = function selectQuestions(order) {
   return `
   SELECT 
   *
FROM
   questions
ORDER BY
   questions.created_at DESC
    `;
};
