import React from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import "./App.scss";
import { Login, Signup, Chat, Logout} from "./pages";
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
          <Route exact path="/logout" component={Logout}/>
          <AuthRoute isLoggedIn={isLoggedIn} exact path="/chat" component={Chat} />
          {/* <Route component={Page404}/> */}
        </Switch>
      </Router>

    </>
  );
}

export default App;
