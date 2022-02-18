import { useState, useEffect, useReducer,useContext } from "react";
import { act } from "react-dom/test-utils";
import { LOGIN_URL } from "../utils/api";
import { useHistory } from "react-router-dom";
import axios from "axios";
 
import { UserContext } from "./context/userContext";

import {
  validateEmail,
  validatePassword,
  validateDisable,
} from "../utils/methods";

const reducer = (prevState, action) => {
  const { type, payload } = action;
  let { emailError, passwordError } = prevState.error;
  switch (type) {
    case "email":
      emailError = validateEmail(payload) ? "" : "Email is Invalid";
      return {
        ...prevState,
        email: payload,
        error: {
          ...prevState.error,
          emailError,
        },
      };
    case "password":
      passwordError = validatePassword(payload)
        ? ""
        : "Password must contains atleast 6 characters, one small case and big case alphabets, one numeric value and one special character";
      return {
        ...prevState,
        password: payload,
        error: {
          ...prevState.error,
          passwordError,
        },
      };
  }
};

const initialState = {
  email: "",
  password: "",
  error: {
    emailError: "",
    passwordError: "",
  },
};

const handleSubmit = async (event, state,updateUser,history) => {
  event.preventDefault();
  const { email, password } = state;
  try {
    let response =  await fetch(LOGIN_URL,{
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password
      }),
    });
    if(!response.ok){
        response  = await response.json();
        response = await Promise.reject(response)
        return response;
    }
    response = await response.json();
    console.log(response.user);
    // return dispatchUser({type: "persist-user", payload: response.user});
     updateUser(response.user);
    return history.push('/')
  } catch (error) {
      console.log(error);
  }
};

function LogIn() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { email, password } = state;
  const { emailError, passwordError } = state.error;

  const {updateUser} = useContext(UserContext);

  const history = useHistory();

  const handleButtonValidation = () => {
    return validateDisable(email, password, emailError, passwordError)
      ? false
      : true;
  };

  return (
    <section className="form-wrapper">
      <div className="container display-flex width-40">
        <form
          action={LOGIN_URL}
          onSubmit={(event) => handleSubmit(event, state,updateUser,history)}
          method="POST"
          className="display-flex flex-direction-col  width-100"
        >
          <label htmlFor="">Email</label>
          <input
            onChange={(event) =>
              dispatch({ type: "email", payload: event.target.value })
            }
            type="email"
            placeholder="Please enter a email"
            name="email"
            value={email}
            className={emailError ? "input-field-error" : ""}
          />
          {emailError ? <span className="span error-span">{emailError}</span> : <span className="span"></span>}
          <label htmlFor="">Password</label>
          <input
            onChange={(event) =>
              dispatch({ type: "password", payload: event.target.value })
            }
            type="password"
            name="password"
            value={password}
            placeholder="Please enter a Password"
            className={passwordError ? "input-field-error" : ""}
          />
          {passwordError ? <span>{passwordError}</span> : null}
          <button className="btn" type="submit" disabled={handleButtonValidation()}>
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}
export default LogIn;
