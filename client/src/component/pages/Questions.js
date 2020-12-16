import React from "react";
import Header from "../ui/Header";
import Footer from "../ui/Footer";
import orderBy from "lodash/orderBy";
import QuestionPreview from "../ui/QuestionPreview";
import axios from "axios";
import { connect } from "react-redux";
import actions from "../../store/actions";
import { Link } from "react-router-dom";
import { safelyParseJson } from "../../utils/helpers";

// import allQuestions from "../../store/reducers/allQuestions";

class Questions extends React.Component {
   constructor(props) {
      // console.log("constructor");
      super(props);
      const defaultOrder = '["createdAt", "desc"]';
      const params = safelyParseJson(defaultOrder);
      const orderedQuestions = orderBy(this.props.allQuestions, ...params);

      this.state = {
         order: defaultOrder,
         displayedQuestions: orderedQuestions,
         allQuestions: [],
      };

      // console.log("this.state.order: ", this.state.order);
      // console.log("orderedQuestions: ", orderedQuestions);
   }

   hasCurrentUser() {
      const currentUser = this.props.currentUser;
      if (Object.keys(currentUser).length === 0) {
         // console.log("no user logged in: ", currentUser);
         return false;
      } else {
         // console.log("user exists: ", currentUser);
         return true;
      }
   }

   componentDidMount() {
      // console.log("componentDidMount");
      axios
         .get(`/api/v1/questions?order=${this.state.order}`)
         .then((res) => {
            // handle success
            // console.log("THE CORRECT ORDER: ", this.state.order);
            const questions = res.data;
            // console.log("questions = ", questions);
            const order = this.state.order;
            // console.log("order = ", order);
            // console.log("STORE ALL QUESTIONS", actions.STORE_ALL_QUESTIONS);
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

   componentDidUpdate(prevProps) {
      console.log("componentDidUpdate");
      console.log(
         "prevProps.allQuestions.length = ",
         prevProps.allQuestions.length
      );

      const orderedQuestions = orderBy(
         this.props.allQuestions,
         "createdAt",
         "desc"
      );

      if (this.props.allQuestions !== prevProps.allQuestions) {
         console.log("this.props.allQuestions !== prevProps.allQuestions");
         this.setState({
            displayedQuestions: orderedQuestions,
            allQuestions: this.props.allQuestions.map((question) => {
               return {
                  totalAnswers: question.answers.length,
                  ...question,
               };
            }),
         });
      }
   }

   //REMEMBER THAT STATE IS ALWAYS AN OBJECT

   setOrder(e) {
      console.log("setOrder");
      const newOrder = e.target.value; // '[(question) => {return question.answers.length}, ["asc"]]'
      // console.log(newOrder);
      const parsedNewOrder = JSON.parse(newOrder);
      // console.log(parsedNewOrder);
      this.setState({ order: newOrder }, () => {
         this.setState({
            displayedQuestions: orderBy(
               this.state.allQuestions,
               ...parsedNewOrder // [(question) => {return question.answers.length}, ["asc"]]
            ),
         });
      });
   }

   render() {
      console.log("render");
      return (
         <>
            <Header />
            {this.hasCurrentUser() === false && (
               <>
                  {" "}
                  <div>
                     <p className="mt-9 text-center">
                        Sorry, you must be logged in as a teacher to view this
                        page.
                     </p>
                  </div>
                  <div className="text-center text-muted mt-4">
                     <Link to={"/"}>Take me back to Ask a Teacher</Link>
                  </div>
               </>
            )}
            {this.hasCurrentUser() === true && (
               <div className="container mb-9">
                  <div className="row no-gutters">
                     <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 col-xl-8 offset-xl-2 mt-9">
                        <div className="col-12 mt-6">
                           <h1 className="float-left top-questions">
                              Top Questions
                           </h1>

                           <select
                              value={this.state.order}
                              className="float-right dropdown col-5 form-control pl-0 form-control-lg"
                              onChange={(e) => this.setOrder(e)}
                           >
                              <option value='[["createdAt"], ["desc"]]'>
                                 Newest
                              </option>
                              <option value='[["totalAnswers"], ["asc"]]'>
                                 Fewest Answers
                              </option>
                           </select>

                           <div className="clearfix"></div>

                           {this.state.displayedQuestions &&
                              this.state.displayedQuestions.map((question) => {
                                 return (
                                    <QuestionPreview
                                       question={question}
                                       key={question.id}
                                    />
                                 );
                              })}

                           <div className="clearfix mb-4"></div>
                        </div>
                     </div>
                  </div>
               </div>
            )}{" "}
            <Footer />
         </>
      );
   }
}

//mapStateToProps says take this global state and map these certain things to properties within this local state
function mapStateToProps(state) {
   //return whatever we want to pass from the global state into the properties
   return {
      allQuestions: state.allQuestions,
      currentUser: state.currentUser,
   };
}

export default connect(mapStateToProps)(Questions);
