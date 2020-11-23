const { EMAIL_REGEX } = require("../utils/helpers");

module.exports = async function getLoginEmailError(email) {
   console.log(`Is in db: `, isInDB);
   if (email === "") {
      return "Please enter your email address.";
   }
   if (EMAIL_REGEX.test(email) === false) {
      return "Please enter a valid email address";
   }

   return "";
};
