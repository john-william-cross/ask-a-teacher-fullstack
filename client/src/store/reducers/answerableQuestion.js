import actions from "../actions";

export default function answerableQuestion(answerableQuestion = {}, action) {
   // action.payload, action.type
   console.log("should this be firing already?");
   let newAnswerableQuestion = { ...answerableQuestion };
   switch (action.type) {
      case actions.STORE_ANSWERABLE_QUESTION:
         console.log("NOW INSIDE actions.STORE_ANSWERABLE_QUESTION");
         newAnswerableQuestion = action.payload.text;
         // newAnswerableQuestion.answers = action.payload.answers;
         newAnswerableQuestion.prevRoute = action.payload.prevRoute;
         // newAnswerableQuestion.id = action.payload.id;
         // newAnswerableQuestion.email = action.payload.email;
         // newAnswerableQuestion.createdAt = action.payload.createdAt;
         return newAnswerableQuestion; //this will be an array of objects that will be stored inside our Redux store
      default:
         return answerableQuestion;
   }
}
