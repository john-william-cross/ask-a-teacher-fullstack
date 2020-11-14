const selectQuestions = `
SELECT 
    questions.id AS question_id,
    questions.text AS question_text,
    questions.email AS question_email,
    questions.created_at AS question_created_at,
    answers.id AS answer_id,
    answers.text AS answer_text,
    answers.answered_at,
    answers.user_id,
    users.home_state AS user_home_state
FROM
    questions
        LEFT JOIN
    answers ON questions.id = answers.question_id
		LEFT JOIN
	users ON users.id = answers.user_id
ORDER BY
	question_created_at DESC;
   `;

module.exports = selectQuestions;
