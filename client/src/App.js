import React from "react";
import "./style/master.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "./component/pages/Landing";
import Question from "./component/pages/Question";
import Questions from "./component/pages/Questions";
import SignUp from "./component/pages/SignUp";
import LogIn from "./component/pages/LogIn";
import SubmitQuestion from "./component/pages/SubmitQuestion";
import NotFound from "./component/pages/NotFound";
import jwtDecode from "jwt-decode";
import store from "./store/store";
import actions from "./store/actions";

const authToken = localStorage.authToken;
if (authToken) {
   // if the authToken is not expired
   const currentTimeInSec = Date.now() / 1000;
   const user = jwtDecode(authToken);
   if (currentTimeInSec > user.exp) {
      console.log("expired token");
      // remove the currentUser from the global state / redux store
      store.dispatch({
         type: actions.UPDATE_CURRENT_USER,
         payload: {},
      });
   } else {
      console.log("valid token");
      // store the user in global state / redux store (currentUser)
      store.dispatch({
         type: actions.UPDATE_CURRENT_USER,
         payload: user,
      });
      // set authorization headers
      // redirect to create-answers
      const currentUrl = window.location.pathname;
      if (currentUrl === "/") {
         window.location.href = "/questions";
      }
   }
} else {
   console.log("no authToken");
}

function App() {
   return (
      <Router>
         <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/question" component={Question} />
            <Route exact path="/questions" component={Questions} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/login" component={LogIn} />
            <Route exact path="/submit-question" component={SubmitQuestion} />
            <Route component={NotFound} />
         </Switch>
      </Router>
   );
}

export default App;
