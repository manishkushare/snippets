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

  let token = localStorage.getItem(USER_TOKEN_KEY);


  const fetchUser = async (token) => {
    
    try {
      let user = await fetch(VERIFY_USER_URL, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: ` ${token}`,
        }),
      });
      if (user.ok) {

        user = await user.json();
        user.user.token = token;

        return setState((prevState) => {
          return {
            ...prevState,
            user: user.user,
            isVerifying: false,
            isLoggedIn: true,
          };
        });

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
    if (token) {
      fetchUser(token);
    } else {
      setState((prevState) => {
        return {
          ...prevState,
          user: {},
          isVerifying: false,
        };
      });
    }
  }, [token]);


  function updateUser(user) {
    
    setState((prevState) => {
      return {
        ...prevState,
        user: user,
        isLoggedIn: true,
        isVerifying: false,
      };
    });

    localStorage.setItem(USER_TOKEN_KEY, user.token);

  }

  return (
    <UserContext.Provider
      value={{ state, updateUser: updateUser, signout: signout }}
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
