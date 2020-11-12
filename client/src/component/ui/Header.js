import React from "react";
import { Link } from "react-router-dom";
import appLogo from "../../icons/white-logo.svg";

export default function Header() {
   return (
      <>
         <div className="header-solid fixed-top">
            <div className="container mb-4 mt-4 mt-sm-4 mt-md-3 mt-lg-2">
               <div className="row">
                  <div className="col-8 col-md-8 col-sm-9">
                     <Link to="/" className="no-underline">
                        <img
                           className="ml-xs-n8 ml-sm-3 logo"
                           alt="Ask a Teacher Logo"
                           src={appLogo}
                        />
                        <h1 className="logo-text-font d-inline logo-text-size ml-2 mr-5">
                           Ask a Teacher
                        </h1>
                     </Link>
                  </div>
                  <div className="col-4 col-sm-3 col-md-4 d-flex">
                     <Link
                        to="/LogIn"
                        className="align-self-end offset-4 no-underline text-right answer-question-link"
                     >
                        Answer a question
                     </Link>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}
