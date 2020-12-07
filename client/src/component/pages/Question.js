import React from "react";
import Header from "../ui/Header";
import Footer from "../ui/Footer";
import { Link } from "react-router-dom";
import toDisplayDate from "date-fns/format";
import { checkAnswerIsOver, ANSWER_MAX_CARD_CHARS } from "../../utils/helpers";
import classnames from "classnames";
import Answer from "../ui/Answer";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import { v4 as getUuid } from "uuid";
import axios from "axios";
import actions from "../../store/actions";

class Question extends React.Component {
   constructor(props) {
      super(props);
      this.state = { answerInput: "" };
   }

   //don't need API; data is coming from the global state

   checkAnswerIsOver() {
      if (
         this.state.answerInput.length > ANSWER_MAX_CARD_CHARS ||
         this.state.answerInput.length === 0
      ) {
         return true;
      } else return false;
   }

   hasCurrentUser() {
      const currentUser = this.props.currentUser;
      if (Object.keys(currentUser).length === 0) {
         console.log("no user logged in: ", currentUser);
         return false;
      } else {
         console.log("user exists: ", currentUser);
         return true;
      }
   }

   setAnswerInput(e) {
      this.setState({ answerInput: e.target.value });
   }

   componentDidMount() {
      axios
         .get(`/api/v1/questions?order=${this.state.order}`)
         .then((res) => {
            // handle success
            const questions = res.data;
            // console.log(
            //    `here is a flattened pool of questions and their answers`,
            //    questions
            // );

            console.log("STORE ALL QUESTIONS", actions.STORE_ALL_QUESTIONS);
            this.props.dispatch({
               type: actions.STORE_ALL_QUESTIONS,
               payload: questions,
            }); //this loads the questions
         })
         .catch((error) => {
            // handle error
            console.log(error);
         });
   }

   submitAnswer() {
      console.log("you clicked on `submit answer`");
      const answer = {
         id: getUuid(),
         text: this.state.answerInput,
         answeredAt: Date.now(),
         userId: this.props.currentUser.id,
         questionId: this.props.answerableQuestion.id,
      };
      this.props.history.push("/questions");
      console.log("here is the answer object: ", answer);

      // axios request send this user object to the server
      axios
         .post("/api/v1/answers", answer)
         .then((res) => {
            console.log("here's the res: ", res);
         })
         .catch((err) => {});
      // console log an answer on the server
      // db.query to insert into the database
      // send back all questions and answers and update redux store
   }

   render() {
      return (
         <>
            {" "}
            <Header />
            <>
               {isEmpty(this.props.answerableQuestion) === false && (
                  <div className="container mb-9">
                     <div className="row no-gutters">
                        <div className="col-md-10 offset-md-1 col-lg-8 offset-lg-2 col-xl-8 offset-xl-2 mt-9">
                           <div className="col-12">
                              {this.hasCurrentUser() === true && (
                                 <div className="mb-4 mt-n1">
                                    <Link
                                       to={
                                          this.props.answerableQuestion
                                             .prevRoute
                                       }
                                       className={classnames(
                                          "text-muted cancel"
                                       )}
                                    >
                                       Back to questions
                                    </Link>
                                 </div>
                              )}
                              {this.hasCurrentUser() === false && (
                                 <div className="mb-4 mt-n1">
                                    <Link
                                       to={"/"}
                                       className={classnames(
                                          "text-muted cancel"
                                       )}
                                    >
                                       Back to Ask a Teacher
                                    </Link>
                                 </div>
                              )}
                              <div className="lead mb-2">
                                 <Link to="question">
                                    {this.props.answerableQuestion.text}
                                 </Link>
                              </div>
                              <p className="text-muted asked-on-answers-num float-left">
                                 Asked on{" "}
                                 {toDisplayDate(
                                    this.props.answerableQuestion.createdAt,
                                    "MMMM d, y"
                                 )}
                                 .
                              </p>
                              <p className="text-muted asked-on-answers-num float-right">
                                 {this.props.answerableQuestion.answers.length}{" "}
                                 answers
                              </p>
                              <div className="clearfix mb-4"></div>
                              {/* <hr></hr> */}
                              <div
                                 className="answers"
                                 style={{ textAlign: "justify" }}
                              >
                                 {this.props.answerableQuestion.answers.map(
                                    (answer) => {
                                       // console.log(answer);
                                       return (
                                          <Answer
                                             answer={answer}
                                             key={answer.id}
                                          />
                                       );
                                    }
                                 )}
                              </div>
                              {this.hasCurrentUser() === false && (
                                 <div className="mb-4 mt-8">
                                    <Link
                                       to={"/"}
                                       className={classnames(
                                          "text-muted cancel"
                                       )}
                                    >
                                       Back to Ask a Teacher
                                    </Link>
                                 </div>
                              )}
                              <div className=" mb-4"></div>
                              <div className="clearfix mb-7"></div>
                              <div>
                                 {this.hasCurrentUser() === true && (
                                    <div>
                                       <p className="lead mt-1">Your answer</p>
                                       <textarea
                                          className="form-control form-control-lg"
                                          id="answer-input"
                                          rows="8"
                                          defaultValue=""
                                          onChange={(e) =>
                                             this.setAnswerInput(e)
                                          }
                                       ></textarea>

                                       <p className="float-right lead mt-0 text-muted">
                                          <span
                                             className={classnames({
                                                "text-danger": checkAnswerIsOver(
                                                   this.state.answerInput,
                                                   ANSWER_MAX_CARD_CHARS
                                                ),
                                             })}
                                          >
                                             {this.state.answerInput.length}/
                                             {ANSWER_MAX_CARD_CHARS}
                                          </span>
                                       </p>

                                       <button
                                          className={classnames(
                                             "mt-5 submit-answer-button logo-text-font btn btn-xm btn-outline-primary",
                                             {
                                                disabled: this.checkAnswerIsOver(),
                                             }
                                          )}
                                          onClick={() => {
                                             this.submitAnswer();
                                             alert(
                                                "Your answer has been submitted!"
                                             );
                                          }}
                                       >
                                          Submit answer
                                          {/* on click,  */}
                                          {/* TODO: ADD TAKE ME BACK/CANCEL BUTTON */}
                                       </button>
                                       <Link
                                          to={
                                             this.props.answerableQuestion
                                                .prevRoute
                                          }
                                          className={classnames(
                                             "text-muted cancel float-right"
                                          )}
                                       >
                                          Cancel submission
                                       </Link>
                                    </div>
                                 )}
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               )}{" "}
               <Footer />
            </>
         </>
      );
   }
}

// withRouter(Question);

//mapStateToProps says take this global state and map these certain things to properties within this local state
function mapStateToProps(state) {
   return {
      answerableQuestion: state.answerableQuestion,
      creatableAnswer: state.creatableAnswer,
      currentUser: state.currentUser,
   };
}

export default connect(mapStateToProps)(Question);
//
