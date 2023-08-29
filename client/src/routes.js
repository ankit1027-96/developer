import React from "react";
import { Switch, Route } from "react-router-dom";
import App from "./App";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { logoutUser, setCurrentUser } from "./actions/authActions";
import Register from "./components/auth/register";
import Login from "./components/auth/login";
import { Provider } from "react-redux";
import store from "./store";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./components/dashboard/dashboard";
import { clearCurrentProfile } from "./actions/profileActions";
import PrivateRoute from "./components/common/privateRoute";
import CreateProfile from "./components/createProfile/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";
import AddExperience from "./components/addCredentials/addExperience";
import AddEducation from "./components/addCredentials/addEducation";

if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //logout
    store.dispatch(logoutUser());
    // clear current profile
    store.dispatch(clearCurrentProfile());
    // redirect to login
    window.location.href = "/login";
  }
}

const Routees = () => {
  return (
    <Provider store={store}>
      <Navbar />
      <Route exact path="/" component={App} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Switch>
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
      </Switch>
      <Switch>
        <PrivateRoute exact path="/create-profile" component={CreateProfile} />
      </Switch>
      <Switch>
        <PrivateRoute exact path="/edit-profile" component={EditProfile} />
      </Switch>
      <Switch>
        <PrivateRoute exact path="/add-experience" component={AddExperience} />
      </Switch>
      <Switch>
        <PrivateRoute exact path="/add-education" component={AddEducation} />
      </Switch>
      <Footer />
    </Provider>
  );
};

export default Routees;
