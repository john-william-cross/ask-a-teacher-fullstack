const db = require("../db");
const { EMAIL_REGEX } = require("../utils/helpers");
const selectUserByEmail = require("../queries/selectUserByEmail");

module.exports = async function getSignUpEmailError(email) {
   const isInDB = await checkIsInDb(email);
   console.log(`Is in db: `, isInDB);
   if (email === "") {
      return "Please enter your email address.";
   }
   if (EMAIL_REGEX.test(email) === false) {
      return "Please enter a valid email address";
   }
   if (isInDB) {
      return "This email already exists in the database.";
   }
   return "";
};
// next step would be console logging checkIsInDb(email)
function checkIsInDb(email) {
   return db
      .query(selectUserByEmail, email)
      .then((users) => {
         // console.log(`Users from DB:`, users);
         if (users.length === 0) {
            console.log(`Here is the length: `, users.length);
            return false;
         } else return true;
      })
      .catch((err) => {
         console.log(err);
      });
}
