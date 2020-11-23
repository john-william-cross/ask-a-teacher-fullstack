import React from "react";
import Header from "../ui/Header";
import Footer from "../ui/Footer";
import classnames from "classnames";
import { v4 as getUuid } from "uuid";
import axios from "axios";
// import actions from "../../store/actions";
import { connect } from "react-redux";
import actions from "../../store/actions";
//functions go in react classes
class SignUp extends React.Component {
   //we can set the state in constructor
   constructor(props) {
      super(props);
      this.state = {
         emailError: "",
         passwordError: "",
         hasEmailError: false,
         hasPasswordError: false,
      };
   }

   async validateAndCreateUser() {
      const emailInput = document.getElementById("signup-email-input").value;
      const passwordInput = document.getElementById("signup-password-input")
         .value;
      // create user obj
      const user = {
         id: getUuid(),
         email: emailInput,
         password: passwordInput,
         createdAt: Date.now(),
      };
      // post to API
      axios
         .post("/api/v1/users", user)
         .then((res) => {
            console.log(res.data);
            // Update current user in global state with API Response
            this.props.dispatch({
               type: actions.UPDATE_CURRENT_USER,
               payload: res.data,
            });
            this.props.history.push("/questions");
         })
         .catch((err) => {
            const { data } = err.response;
            console.log(data);
            const { emailError, passwordError } = data;
            if (emailError !== "") {
               this.setState({ hasEmailError: true, emailError });
            } else {
               this.setState({ hasEmailError: false, emailError });
            }
            if (passwordError !== "") {
               this.setState({ hasPasswordError: true, passwordError });
            } else {
               this.setState({ hasPasswordError: false, passwordError });
            }
         });
   }

   render() {
      return (
         <>
            <Header />
            <div className="container">
               <div className="row">
                  <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 col-xl-8 offset-xl-2 mt-9">
                     <div className="email-and-create-password ">
                        <h1 className="text-center logo-text-font mt-n5 mt-md-3">
                           Thanks for joining us!
                        </h1>

                        <p className="mt-7">Enter your school email</p>
                        <>
                           <input
                              id="signup-email-input"
                              className={classnames({
                                 "form-control": true,
                                 "form-control-lg": true,
                                 "is-invalid": this.state.emailError,
                              })}
                              type="email"
                           />

                           {this.state.hasEmailError && (
                              <p className="text-danger">
                                 {this.state.emailError}
                              </p>
                           )}
                           <p className="mt-5">Create a password</p>
                           <p className="text-muted line-height-0">
                              Password must be at least 9 characters
                              <br />
                           </p>

                           <input
                              id="signup-password-input"
                              className={classnames({
                                 "form-control": true,
                                 "form-control-lg": true,
                                 "is-invalid": this.state.hasPasswordError,
                              })}
                              type="password"
                           />
                           {this.state.hasPasswordError && (
                              <p className="text-danger">
                                 {this.state.passwordError}
                              </p>
                           )}
                           <button
                              to="questions"
                              id="lets-go-button"
                              className="btn btn-outline-secondary logo-text-font lead sign-in mt-5 mb-9"
                              onClick={() => {
                                 this.validateAndCreateUser();
                              }}
                           >
                              Let's go!
                           </button>
                        </>
                     </div>
                  </div>
               </div>
            </div>
            <Footer />
         </>
      );
   }
}

// export default withRouter(SignUp);

// export default withRouter(LogIn);
function mapStateToProps() {
   //return whatever we want to pass from the global state into the properties
   return {}; //we don't need any redux global state, but if we do we can grab it from redux global state and map it to this props for this component. Until then we'll return a blank object.
}

export default connect(mapStateToProps)(SignUp);
