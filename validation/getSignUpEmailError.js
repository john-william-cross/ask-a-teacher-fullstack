const { EMAIL_REGEX } = require("../utils/helpers");

module.exports = function getSignUpEmailError(email) {
   if (email === "") {
      return "Please enter your email address.";
   }
   if (EMAIL_REGEX.test(email.toLowerCase()) === false) {
      return "Please enter a valid email address";
   }
   return "";
};
