const displayAnswerCount = `
SELECT
    questions.id AS question_id,
	questions.text AS question_text,
    questions.created_at AS question_created_at,
    SUM(CASE WHEN answers.id IS NULL THEN 0 ELSE 1 END) AS answer_count
FROM questions
    LEFT JOIN answers ON questions.id = answers.question_id
GROUP BY 
    questions.text
`;
