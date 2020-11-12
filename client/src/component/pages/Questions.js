import React from "react";
import Header from "../ui/Header";
import Footer from "../ui/Footer";
import orderBy from "lodash/orderBy";
import QuestionPreview from "../ui/QuestionPreview";
import axios from "axios";
import { connect } from "react-redux";
import actions from "../../store/actions";

// import allQuestions from "../../store/reducers/allQuestions";

class Questions extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         order: `[["createdAt"], ["desc"]]`,
         displayedQuestions: [],
         allQuestions: [],
      };
   }
   //TODO: CREATE LOGOUT BUTTON ON ALL PAGES EXCEPT LANDING MAYBE
   componentDidMount() {
      axios
         .get(
            "http://localhost:3040/api/v1/questions?order=%60questions%60.%60created_at%60%20DESC"
         )
         .then((res) => {
            // handle success
            const questions = res.data;
            console.log(`here are the questions: `, questions);

            console.log("STORE ALL QUESTIONS", actions.STORE_ALL_QUESTIONS);
            this.props.dispatch({
               type: actions.STORE_ALL_QUESTIONS,
               payload: questions,
            }); //this loads the questions
            this.setState({
               displayedQuestions: orderBy(
                  this.props.allQuestions,
                  '[["totalAnswers"], ["asc"]]'
               ),
               allQuestions: this.props.allQuestions.map((question) => {
                  return {
                     totalAnswers: question.answers.length,
                     ...question,
                  };
               }),
            });
         })
         .catch((error) => {
            // handle error
            console.log(error);
         });
   }

   //REMEMBER THAT STATE IS ALWAYS AN OBJECT

   setOrder(e) {
      const newOrder = e.target.value; // '[(question) => {return question.answers.length}, ["asc"]]'
      console.log(newOrder);
      const parsedNewOrder = JSON.parse(newOrder);
      console.log(parsedNewOrder);
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
      return (
         <>
            <Header />
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
                           <option value='[["createdAt"], ["asc"]]'>
                              Newest
                           </option>
                           <option value='[["totalAnswers"], ["asc"]]'>
                              Unanswered
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
   };
}

export default connect(mapStateToProps)(Questions);
