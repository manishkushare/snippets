import { useState, useContext, useReducer, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { UserContext } from "./context/userContext";
import { USER_TOKEN_KEY } from "../utils/constants";
import { VERIFY_USER_URL } from "../utils/api";

import Header from "./Header";
import Home from "./Home";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import NoMatch from "./NoMatch";
import ErrorBoundary from "./ErrorBoundary";

export default function App() {

  const [state, setState] = useState({
    isLoggedIn: false,
    user: null,
    isVerifying: true,
  });

  function signout() {
    setState({ isLoggedIn: false, user: null, isVerifying: true });
    localStorage.clear();
  }



  const fetchUser = async (token) => {
    
    try {
      let user = await fetch(VERIFY_USER_URL, {
        method: "GET",
        headers: new Headers({
          Authorization: ` ${token}`,
        }),
      });
      if (user.ok) {

        user = await user.json();
        user.user.token = token;
        return persistUser(user.user);

      } else {

        user = await user.json();
        user = await Promise.reject(user);
        return user;

      }
    } catch ({ error }) {

      console.log(error);
    }
  };


  useEffect(() => {
    let token = localStorage.getItem(USER_TOKEN_KEY);
    if (token) {
      return fetchUser(token);
    } else {
      return setState((prevState) => {
        return {
          ...prevState,
          isVerifying: false,
        };
      });
    }
  }, []);


  function persistUser(user) {
    localStorage.setItem(USER_TOKEN_KEY, user.token);
    return  setState((prevState) => {
      return {
        ...prevState,
        user: user,
        isLoggedIn: true,
        isVerifying: false,
      };
    });


  }

  return (
    <UserContext.Provider
      value={{ state, persistUser: persistUser, signout: signout }}
    >
      {state.isLoggedIn ? <AuthorizedComponent/> : <UnAuthorizedComponent/>}
    </UserContext.Provider>
  );
}

function UnAuthorizedComponent() {
  return (
    <>
      <ErrorBoundary>
        <Header />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/login">
            <LogIn />
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </ErrorBoundary>
    </>
  );
}
function AuthorizedComponent() {
  return (
    <>
      <ErrorBoundary>
        <Header />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </ErrorBoundary>
    </>
  );
}
