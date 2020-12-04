import React from "react";
import Header from "../ui/Header";
import Footer from "../ui/Footer";
import { connect } from "react-redux";
import { v4 as getUuid } from "uuid";
import axios from "axios";

import {
   checkQuestionIsOver,
   QUESTION_MAX_CARD_CHARS,
} from "../../utils/helpers";
import classnames from "classnames";

class SubmitQuestion extends React.Component {
   //we can set the state in constructor
   constructor(props) {
      super(props);
      this.state = {
         emailError: "",
         passwordError: "",
         hasEmailError: false,
         questionInput: "",
         emailInput: "",
      };
   }

   checkQuestionIsOver() {
      if (
         this.state.questionInput.length > QUESTION_MAX_CARD_CHARS ||
         this.state.questionInput.length === 0
      ) {
         return true;
      } else return false;
   }
   setQuestionInput(e) {
      console.log(this.setState({ questionInput: e.target.value }));
   }
   setEmailInput(e) {
      console.log(this.setState({ emailInput: e.target.value }));
   }

   setEmailState() {
      console.log(`validate me`);
      const emailInput = document.getElementById("questioner-email-input")
         .value;
      const lowerCasedEmailInput = emailInput.toLowerCase();

      // eslint-disable-next-line
      const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (emailInput === "")
         this.setState({
            emailError: "Please enter your email address.",
            hasEmailError: true,
         });
      else if (emailRegex.test(lowerCasedEmailInput) === false) {
         console.log("not a valid email");
         this.setState({
            emailError: "Please enter a valid email address.",
            hasEmailError: true,
         });
      } else {
         this.setState({ emailError: "", hasEmailError: false });
      }
   }

   submitQuestion() {
      console.log("you clicked on `submit question`");
      const submittedQuestion = {
         id: getUuid(),
         text: this.state.questionInput,
         email: this.state.emailInput,
         createdAt: Date.now(),
      };
      this.props.history.push("/");
      console.log("here is the question object: ", submittedQuestion);

      // axios request send this question object to the server
      axios
         .post("/api/v1/submitted-questions", submittedQuestion)
         .then((res) => {
            console.log("here's the res: ", res);
         })
         .catch((err) => {});
      // console log a question on the server
      // db.query to insert into the database
   }

   render() {
      return (
         <>
            <Header />
            <div className="container mb-9">
               <div className="row mt-8 no-gutters">
                  <div className="pressed-submit mt-6 col-12 col-xl-6 offset-xl-3 col-lg-8 offset-lg-2 col-md-10 offset-md-1">
                     <h1 className="lead mb-3 mt-6">What's your question?</h1>
                     <textarea
                        className="form-control form-control-lg mt-5"
                        id="question-input"
                        rows="5"
                        autoFocus
                        onChange={(e) => this.setQuestionInput(e)}
                        style={{ width: "100%" }}
                     ></textarea>
                     <p className="text-muted float-right">
                        <span
                           className={classnames({
                              "text-danger": checkQuestionIsOver(
                                 this.state.questionInput,
                                 QUESTION_MAX_CARD_CHARS
                              ),
                           })}
                        >
                           {this.state.questionInput.length}/
                           {QUESTION_MAX_CARD_CHARS}
                        </span>
                     </p>

                     <p className="lead mt-5">Enter your email</p>

                     <input
                        id="questioner-email-input"
                        className={classnames({
                           "form-control": true,
                           "form-control-lg": true,
                           "is-invalid": this.state.emailError,
                        })}
                        type="email"
                        onChange={(e) => this.setEmailInput(e)}
                     />
                     {this.state.hasEmailError && (
                        <p className="text-danger">{this.state.emailError}</p>
                     )}

                     <p
                        className="text-danger mb-4"
                        id="questioner-email-error"
                     ></p>

                     <div className="mt-6 text-center col-12 col-xl-6 offset-xl-3 col-lg-8 offset-lg-2 col-md-10 offset-md-1">
                        {/* Do we need this to be a link? How can we make it work so email error fires if it's a link?  */}
                        <button
                           to="/"
                           className={classnames(
                              "logo-text-font submit-question-button btn btn-lg btn-outline-secondary mb-8",
                              { disabled: this.checkQuestionIsOver() }
                           )}
                           id="ask-a-teacher-submit-button"
                           type="submit"
                           value="Ask a teacher"
                           onClick={() => {
                              alert("Your question has been submitted!");
                              this.setEmailState();
                              this.submitQuestion();
                           }}
                        >
                           Ask a Teacher
                        </button>
                     </div>
                  </div>
               </div>
            </div>
            <Footer />
         </>
      );
   }
}

function mapStateToProps(state) {
   return {};
}
export default connect(mapStateToProps)(SubmitQuestion);
