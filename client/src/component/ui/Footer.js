import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import actions from "../../store/actions";

class Header extends React.Component {
   logOutOutCurrentUser() {
      this.props.dispatch({
         type: actions.UPDATE_CURRENT_USER,
         payload: {}, //payload is empty object
      });
   }

   hasCurrentUser() {
      const currentUser = this.props.currentUser;
      if (Object.keys(currentUser).length === 0) {
         console.log("no user logged in: ", currentUser);
         return false;
      } else {
         // console.log("user exists: ", currentUser);
         return true;
      }
   }
   render() {
      return (
         <>
            <div className="footer-solid fixed-bottom">
               <div className="container mb-3 mt-3 mt-sm-3 mt-md-3 mt-lg-2">
                  <div className="row">
                     {" "}
                     {/*FIX SUBMIT AND CANCEL MARGINS */}
                     <div className="col-6">
                        <Link
                           to="/LogIn"
                           className="contact float-left my-3 no-underline"
                        >
                           Contact
                        </Link>
                     </div>
                     {/* 
                      
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
                              )}/*
                     */}
                     <div className="col-6">
                        {this.hasCurrentUser() === true && (
                           <Link
                              to="/"
                              className="sign-out float-right my-3 no-underline text-right"
                              onClick={() => {
                                 this.logOutOutCurrentUser(); //running this function updates the redux store, which is our global state
                              }}
                           >
                              Sign out
                           </Link>
                        )}
                     </div>
                  </div>
               </div>
            </div>
         </>
      );
   }
}

// all components must render jsx
function mapStateToProps(state) {
   //Everything down here is global state
   return {
      currentUser: state.currentUser,
   };
}

export default connect(mapStateToProps)(Header);
