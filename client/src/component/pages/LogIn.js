import React from "react";
import Header from "../ui/Header";
import Footer from "../ui/Footer";
import classnames from "classnames";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import actions from "../../store/actions";
import { EMAIL_REGEX } from "../../utils/helpers";

class LogIn extends React.Component {
   //we can set the state in constructor
   constructor(props) {
      super(props);
      // console.log("In a new class component!");
      this.state = {
         emailError: "",
         passwordError: "",
         hasEmailError: false,
         hasPasswordError: false,
      };
   }

   async setEmailState(emailInput) {
      const lowerCasedEmailInput = emailInput.toLowerCase();
      console.log(lowerCasedEmailInput);

      if (emailInput === "")
         this.setState({
            emailError: "Please enter your email address.",
            hasEmailError: true,
         });
      else if (EMAIL_REGEX.test(lowerCasedEmailInput) === false) {
         console.log("not a valid email");
         this.setState({
            emailError: "Please enter a valid email address.",
            hasEmailError: true,
         });
      } else {
         this.setState({ emailError: "", hasEmailError: false });
      }
   }

   async setPasswordState(passwordInput) {
      console.log(passwordInput);

      if (passwordInput === "") {
         this.setState({
            passwordError: "Please enter your password.",
            hasPasswordError: true,
         });
      } else {
         this.setState({ passwordError: "", hasPasswordError: false });
      }
   }

   async validateAndLogInUser() {
      const emailInput = document.getElementById("login-email-input").value;
      const passwordInput = document.getElementById("login-password-input")
         .value;

      const user = {
         //creating that user here
         email: emailInput,
         password: passwordInput,
      };
      console.log("Created user object for POST: ", user);
      axios
         .post("/api/v1/users/auth", user)
         .then((res) => {
            // handle success
            const currentUser = res.data;
            console.log(`currentUser: `, currentUser);
            this.props.dispatch({
               type: actions.UPDATE_CURRENT_USER,
               payload: res.data,
            });
         })
         .catch((error) => {
            // handle error
            console.log(error);
         });
      //redirect the user
      this.props.history.push("/questions");
   }

   render() {
      return (
         <>
            {" "}
            <Header />
            <div className="container">
               <div className="row">
                  <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 col-xl-8 offset-xl-2 mt-9">
                     <div className="return-user-sign-in">
                        <h1 className="logo-text-font text-center mb-6">
                           Welcome back!
                        </h1>
                        <p className="mt-2">Email</p>
                        <input
                           id="login-email-input"
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
                        <p className="mt-2">Password</p>
                        <input
                           id="login-password-input"
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
                        <p className="text-muted">
                           <button
                              to="questions"
                              id="return-user-sign-in-button"
                              className="btn btn-outline-secondary logo-text-font lead sign-in mt-5"
                              onClick={() => {
                                 this.validateAndLogInUser();
                              }}
                           >
                              Sign in
                           </button>
                        </p>
                        <div className="text-center show-sign-up-info">
                           <p>First time here?</p>
                           <Link to="SignUp">Sign up </Link>
                        </div>{" "}
                     </div>
                  </div>
               </div>
            </div>
            <Footer />
         </>
      );
   }
}

// export default withRouter(LogIn);
function mapStateToProps() {
   //return whatever we want to pass from the global state into the properties
   return {}; //we don't need any redux global state, but if we do we can grab it from redux global state and map it to this props for this component. Until then we'll return a blank object.
}

export default connect(mapStateToProps)(LogIn);
