const selectQuestions = `
      SELECT 
         *
      FROM
         questions
      ORDER BY
         ?;
    `;

module.exports = selectQuestions;
