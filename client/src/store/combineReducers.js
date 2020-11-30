import { combineReducers } from "redux";
import currentUser from "./reducers/currentUser";
import allQuestions from "./reducers/allQuestions";
import answerableQuestion from "./reducers/answerableQuestion";
import creatableAnswer from "./reducers/creatableAnswer";

export default combineReducers({
   currentUser,
   allQuestions,
   answerableQuestion,
   creatableAnswer,
});

//because the keys and values are the same, ie.e currentUser: currentUser, allQuestions: allQuestions; we can use shorthand and just list them like we do above.

//combineReducers takes an object, which is basically key:value pairs of all the other reducers that we have

//reducer is passed a state and an action. Based on that, it will return some new state. It will likely update the global state inside the redux store
