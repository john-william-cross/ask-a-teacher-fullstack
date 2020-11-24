//give it the action, and the previous state.
//based on the action, it creates a new state

import actions from "../actions";
import isEmpty from "lodash/isEmpty";

export default function currentUser(state = {}, action) {
   switch (action.type) {
      case actions.UPDATE_CURRENT_USER:
         if (isEmpty(action.payload)) {
            localStorage.removeItem("authToken");
         }
         return action.payload;
      // (that object we got from api call)
      default:
         return state;
   }
}
