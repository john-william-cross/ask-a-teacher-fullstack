// import actions from "../store/actions";
// import allQuestions from "../store/reducers/allQuestions";

function checkAnswerIsOver(str, num) {
   if (str.length > num) return true;
   else return false;
}

const ANSWER_MAX_CARD_CHARS = 2000;

export { checkAnswerIsOver, ANSWER_MAX_CARD_CHARS };

const EMAIL_REGEX = /@nv.ccsd.net$/;

function checkQuestionIsOver(str, num) {
   if (str.length > num) return true;
   else return false;
}

const QUESTION_MAX_CARD_CHARS = 500;

export { checkQuestionIsOver, QUESTION_MAX_CARD_CHARS, EMAIL_REGEX };

//technically you could put something like setEmailState here
