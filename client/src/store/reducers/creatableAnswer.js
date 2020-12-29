import actions from "../actions";

export default function creatableAnswer(creatableAnswer = {}, action) {
   switch (action.type) {
      case actions.UPDATE_CREATABLE_ANSWER:
         console.log("HERE IS THE PAYLOAD!!!!!!!!!!!", action.payload);
         return action.payload; // put it in the redux store
      default:
         return creatableAnswer;
   }
}
