import React from "react";
import Header from "../ui/Header";
import Footer from "../ui/Footer";

import { Link } from "react-router-dom";
import axios from "axios";
import QuestionPreview from "../ui/QuestionPreview";
import { connect } from "react-redux";
import actions from "../../store/actions";

class Landing extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         searchInput: "",
      };
   }

   componentDidMount() {
      axios
         .get(
            "/api/v1/questions?&order=%60questions%60.%60created_at%60%20DESC"
         )
         .then((res) => {
            // handle success
            const questions = res.data;
            console.log(`here are the questions: `, questions);

            // console.log(`YOOOOOOOOOO`, actions.STORE_ALL_QUESTIONS);
            this.props.dispatch({
               type: actions.STORE_ALL_QUESTIONS,
               payload: questions,
            });
            this.setState({
               displayedQuestions: questions,
               allQuestions: questions,
            });
         })
         .catch((error) => {
            // handle error
            console.log(error);
         });
   }

   setIsDisplayingQuestions(e) {
      const searchInput = e.target.value;
      if (searchInput.length > 0) {
         this.setState({
            isDisplayingQuestions: true,
         });
      } else
         this.setState({
            isDisplayingQuestions: false,
         });
   }

   setSearchInput(e) {
      const searchInput = e.target.value; // get that value, store in searchInput
      console.log(searchInput);

      this.setState((prevState) => {
         return {
            searchInput: searchInput, //we update search input to what was entered

            displayedQuestions: prevState.allQuestions.filter((question) => {
               //allQuestions is filtered
               const lowerCasedInput = searchInput.toLowerCase();
               const questionText = question.text.toLowerCase();

               return questionText.includes(lowerCasedInput); //only questions with text that includes the searchInput.toLowerCase() is returned
            }),
         };
      });
   }

   render() {
      return (
         <>
            <Header />
            <div className="container mb-9">
               <div className="row">
                  <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 col-xl-8 offset-xl-2 mt-xs-5 mt-9">
                     <p
                        className="logo-text-font landing-page-title"
                        style={{ textAlign: "center" }}
                     >
                        Ask a teacher
                     </p>
                     <input
                        className="form-control mt-7"
                        id="question-input-home-page"
                        rows="2"
                        autoFocus
                        value={this.state.searchInput} //set value of text area to empty string as declared above
                        onChange={(e) => {
                           this.setSearchInput(e); //when something is entered into input, setSearchInput is run based on the text entered
                        }}
                        style={{ width: "100%" }}
                     ></input>

                     {this.state.searchInput && ( //if this.state.searchInput evaluates to true (a blank string evaluates to false, so on page load this.state.searchInput is false. It is true once a char is entered), If it's true, run the second half
                        <div>
                           <div className="text-center ">
                              <p className="mt-6">
                                 Don't see what you're looking for?
                              </p>

                              <Link
                                 to="submit-question"
                                 className="submit-new-question  mt-1"
                              >
                                 Submit a new question
                              </Link>
                           </div>
                           {this.state.displayedQuestions &&
                              this.state.displayedQuestions.map((question) => {
                                 return (
                                    <QuestionPreview
                                       question={question}
                                       key={question.id}
                                    />
                                 );
                              })}{" "}
                        </div>
                     )}
                  </div>
               </div>
            </div>
            <Footer />
         </>
      );
   }
}

//mapStateToProps says take this global state and map these certain things to properties within this local state
function mapStateToProps() {
   //return whatever we want to pass from the global state into the properties
   return {};
}

export default connect(mapStateToProps)(Landing);
