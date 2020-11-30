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
import actions from "../../store/actions";

class Question extends React.Component {
   constructor(props) {
      super(props);
      this.state = { answerInput: "" };
   }

   //don't need API; data is coming form the global state

   checkAnswerIsOver() {
      if (
         this.state.answerInput.length > ANSWER_MAX_CARD_CHARS ||
         this.state.answerInput.length === 0
      ) {
         return true;
      } else return false;
   }

   setAnswerInput(e) {
      this.setState({ answerInput: e.target.value });
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
                              <hr></hr>
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

                              <div className=" mb-4"></div>

                              <div className="clearfix mb-7"></div>
                              <p className="lead mt-1">Your answer</p>
                              <textarea
                                 className="form-control form-control-lg"
                                 id="answer-input"
                                 rows="10"
                                 defaultValue=""
                                 onChange={(e) => this.setAnswerInput(e)}
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
                                    { disabled: this.checkAnswerIsOver() }
                                 )}
                                 type="submit"
                                 value="Submit answer"
                              >
                                 Submit answer
                                 {/* on click,  */}
                                 {/* TODO: ADD TAKE ME BACK/CANCEL BUTTON */}
                              </button>
                              <Link
                                 to={this.props.answerableQuestion.prevRoute}
                                 className={classnames(
                                    "text-muted cancel float-right"
                                 )}
                              >
                                 Cancel submission
                              </Link>
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
   };
}

export default connect(mapStateToProps)(Question);
