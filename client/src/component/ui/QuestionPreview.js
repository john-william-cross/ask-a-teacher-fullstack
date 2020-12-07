import React from "react";
import toDisplayDate from "date-fns/format";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import actions from "../../store/actions";

function QuestionPreview(props) {
   function storeAnswerableQuestion(e) {
      const id = e.target.id;
      console.log(`here's the question id: `, id);
      console.log(
         `here's the number of answers: `,
         props.question.answers.length
      );

      console.log(`here's the answer text: `, props.question.answers.text);

      // if (props.question.answers[0].text === null) {
      //    props.question.answers.length = 0;
      //    console.log("this question doesn't have any answers");
      // }

      const match = props.allQuestions.find((question) => {
         return question.id === id;
      });

      props.dispatch({
         type: actions.STORE_ANSWERABLE_QUESTION,
         payload: { text: match, prevRoute: "/questions" },
      });

      // get the question object with this id
      // from the array of allQuestions, console log this object
      // get the index of the question from allQuestions where
      // the id is equal to the id of the question I clicked on.

      // store the object inside the redux store /////use props.dispatch; won't need this.props.dispatch
   }
   // function viewUser() {
   //    const currentUser = props.currentUser;
   //    console.log("here's the current user: ", currentUser);
   // }
   // function checkHasAnswer() {
   //    console.log("inside checkHasAnswer");
   //    if (props.question.answers.length) {
   //       if ((props.question.answers.length = null)) {
   //          console.log("length is 0, see: ", props.question.answers.length);
   //       }
   //    }
   // }

   function checkIsNull() {
      if (props.question.answers[0].text === null) {
         props.question.answers.length = 0;
         return true;
         // console.log("this question doesn't have any answers");
      } else {
         return false;
      }
   }

   return (
      <>
         <div className="lead mt-6 mb-1">
            <Link
               to="/question"
               id={props.question.id}
               onClick={(e) => {
                  storeAnswerableQuestion(e);
               }}
            >
               {props.question.text}
            </Link>
            {/* once clicked we want to grab the details of whatever question we clicked on and get the URL of the previous route ("/questions") and store it inside of redux global state (use action STORE_ANSWERABLE_QUESTION*/}
         </div>
         <p className="text-muted asked-on-answers-num float-left mb-4">
            Asked on {toDisplayDate(props.question.createdAt, "MMMM d, y")}.
         </p>
         <p className="text-muted asked-on-answers-num float-right">
            {checkIsNull()}
            {props.question.answers.length} answers
            {/* {viewUser()} */}
         </p>

         <div className="clearfix"></div>

         <hr className="mt-5" />

         <div className="clearfix mb-4"></div>
      </>
   );
}

function mapStateToProps(state) {
   //return whatever we want to pass from the global state into the properties
   return {
      answerableQuestion: state.answerableQuestion,
      allQuestions: state.allQuestions,
      currentUser: state.currentUser,
   };
}
export default connect(mapStateToProps)(QuestionPreview);
