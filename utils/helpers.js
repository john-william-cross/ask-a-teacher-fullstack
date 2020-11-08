module.exports = {
   toJson(data) {
      return JSON.stringify(data); //convert to JSON, make it a string
   },

   toSafeParse(str) {
      try {
         JSON.parse(str);
      } catch (err) {
         console.log(err);
         return str;
      }
      return JSON.parse(str);
   },
};
