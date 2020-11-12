const selectQuestions = `
SELECT 
questions.id AS question_id,
questions.text AS question_text,
questions.email AS question_email,
questions.created_at AS question_created_at,
answers.id AS answer_id,
answers.text AS answer_text,
answers.answered_at,
answers.user_id
FROM
questions
  LEFT JOIN
answers ON questions.id = answers.question_id;
    `;

module.exports = selectQuestions;
