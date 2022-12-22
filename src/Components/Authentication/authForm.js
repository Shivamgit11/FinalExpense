import { useState, useRef } from "react";

import { useDispatch } from "react-redux";

import { useHistory } from 'react-router-dom';

import classes from "./AuthForm.module.css";

import { authActions } from "../../store/auth-redux";
import { expenseActions } from "../../store/expense-slice";

const AuthForm = () => {

  const dispatch = useDispatch();

  const history = useHistory();
  
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const passwordHandler = (props) => {
    history.replace('/passwdreset')
  }

  const SubmitHandler = (event) => {
    event.preventDefault();
    
    
    const enteredEmail = emailInputRef.current.value;
    const eneteredPassword = passwordInputRef.current.value;
   /* const confirmPassword = confirmPasswordInputRef.current.value;

    if(eneteredPassword != confirmPassword){
      alert("Passwords did not match")
    }*/

    
    setIsLoading(true);
    let url;

    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCDZ6tT-lppD-AgCJhOgZuqL9MgPPZ1uI0";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCDZ6tT-lppD-AgCJhOgZuqL9MgPPZ1uI0";
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: eneteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication Failed";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        
        dispatch(authActions.login(data.idToken));
        localStorage.setItem("email", enteredEmail);
        let email = localStorage.getItem("email").replace(".", "").replace("@", "");
        dispatch(expenseActions.setEmail(email));
        console.log("User has successfully logged in")
        history.replace('/welcome');
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={SubmitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        {!isLogin && (<div className={classes.control}>
          <label htmlFor="password">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            
            ref={confirmPasswordInputRef}
          />
        </div>
        )}
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
        </div>

        

        <div className={classes.actions}>
          
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Don't have an account? Sign up!" : "Have an account? Login"}
          </button>
        </div>


      </form>
      {isLogin && <button className={classes.passwordbutton} onClick={passwordHandler}>Forgot password?</button>}
    </section>
  );
};

export default AuthForm;
