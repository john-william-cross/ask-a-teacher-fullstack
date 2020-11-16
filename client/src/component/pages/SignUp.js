import React from "react";
import Header from "../ui/Header";
import Footer from "../ui/Footer";
import classnames from "classnames";
import { v4 as getUuid } from "uuid";
import axios from "axios";
import actions from "../../store/actions";
import { connect } from "react-redux";

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
   componentDidMount() {
      axios
         .get(
            "https://raw.githubusercontent.com/john-william-cross/ask-a-teacher-mpa/master/src/mock-data/currentUser.json"
         )
         .then((res) => {
            // handle success
            const currentUser = res.data;
            console.log(`currentUser: `, currentUser);
            this.props.dispatch({
               type: actions.UPDATE_CURRENT_USER,
               payload: res.data,
            }); // this doesn't store user
         })
         .catch((error) => {
            // handle error
            console.log(error);
         });
   }

   async setEmailState(emailInput) {
      const lowerCasedEmailInput = emailInput.toLowerCase();
      console.log(lowerCasedEmailInput);
      // eslint-disable-next-line
      const emailRegex = /@nv.ccsd.net$/;

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

   checkHasLocalPart(passwordInput, emailInput) {
      const localPart = emailInput.split("@")[0];
      if (localPart === "") return false;
      else if (localPart.length < 4) return false;
      else return passwordInput.includes(localPart);
   }

   async setPasswordState(passwordInput, emailInput) {
      console.log(passwordInput);

      const uniqChars = [...new Set(passwordInput)];
      console.log(uniqChars);

      if (passwordInput === "") {
         this.setState({
            passwordError: "Please create a password.",
            hasPasswordError: true,
         });
      } else if (passwordInput.length < 9) {
         this.setState({
            passwordError: "Your password must be at least 9 characters.",
            hasPasswordError: true,
         });
      } else if (this.checkHasLocalPart(passwordInput, emailInput)) {
         this.setState({
            passwordError:
               "For your safety, your password cannot contain your email address.",
            hasPasswordError: true,
         });
      } else if (uniqChars.length < 3) {
         this.setState({
            passwordError:
               "For your safety, your password must contain at least 3 unique characters.",
            hasPasswordError: true,
         });
      } else {
         this.setState({ passwordError: "", hasPasswordError: false });
      }
   }

   async validateAndCreateUser() {
      const emailInput = document.getElementById("signup-email-input").value;
      const passwordInput = document.getElementById("signup-password-input")
         .value;
      await this.setEmailState(emailInput);
      await this.setPasswordState(passwordInput, emailInput);
      if (
         this.state.hasEmailError === false &&
         this.state.hasPasswordError === false
      ) {
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
               console.log(res);
            })
            .catch((err) => {
               console.log(err);
            });

         // Update currentUser in global state with API response
         // Go to next page: this.props.history.push("/questions");

         console.log("Created user object for POST: ", user);
      }
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

                        <p className="mt-7">Enter your CCSD email</p>
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
