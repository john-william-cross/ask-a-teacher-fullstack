import actions from "../actions";

export default function allQuestions(state = [], action) {
   // action.payload, action.type
   // console.log(`action is here: `, action.type);
   switch (action.type) {
      case actions.STORE_ALL_QUESTIONS:
         // console.log(
         //    "payload for actions.STORE_ALL_QUESTIONS: ",
         //    action.payload
         // );

         return action.payload; //this will be an array of objects that will be stored inside our Redux store
      default:
         return state;
   }
}
