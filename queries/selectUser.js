module.exports = function selectUser(email, password) {
   return `
         SELECT 
             id, email, created_at 
         FROM 
             users 
         WHERE 
             email = '${email}'
         AND 
             password = '${password}'
         LIMIT 1;
     `;
};

//TODO: SHOULD THIS BE CHANGED FROM A CONST TO A VAR? I THINK YES...
