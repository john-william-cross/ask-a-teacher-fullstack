const insertUser = `INSERT INTO users (
	id,
    email,
    home_state,
    \`password\`,
    created_at
)

    VALUES (?, ?, ?, ?, ?);
    `;
