import React from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import "./App.scss";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Chat from "./pages/chat";
import { useSelector } from "react-redux";
import AuthRoute from "./utils/auth-routes";


function App() {
  const isLoggedIn = useSelector(state => state.authState.result);

  return (
    <>
      <Router>
        <Switch>
          <Route exact path={["/login", "/"]} component={Login} />
          <Route exact path="/signup" component={Signup} />
          <AuthRoute isLoggedIn={isLoggedIn} exact path="/chat" component={Chat} />
          {/* <Route component={Page404}/> */}
        </Switch>
      </Router>

    </>
  );
}

export default App;
