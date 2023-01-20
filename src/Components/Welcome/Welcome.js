import React, { Fragment } from "react";

import { useHistory } from "react-router-dom";

import classes from "./Welcome.module.css";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth-redux";
import { expenseActions } from "../../store/expense-slice";

const Welcome = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const token = localStorage.getItem("token");

 

  const onClickHandler = (props) => {
    history.replace("/profile");
  };

  const logoutHandler = () => {
    dispatch(authActions.logout());
    console.log("Logged out successfully");
    dispatch(expenseActions.removeEmail());
    history.replace("/auth");
   
  };

  const expensesHandler = () => {
    history.replace("/expenses");
  };

  const verifyHandler = (props) => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyB3jjj3ZXvEWWT_PnHHqBcDZZkKF5ean0g",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Data could not be fetched";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log("Email is verified");
        console.log(data.email);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <Fragment>
      <section className={classes.section}>
        <h1 className={classes.h1}> Welcome to expense tracker!! </h1>
        <p className={classes.p}> You profile is incomplete!</p>
        <button className={classes.button} onClick={onClickHandler}>
          {" "}
          Complete now{" "}
        </button>
        <button className={classes.logout} onClick={logoutHandler}>
          {" "}
          Logout{" "}
        </button>
      </section>
      <section className={classes.verify}>
        <p> Verify your email now!</p>
        <button className={classes.verifybutton} onClick={verifyHandler}>

          Click here!
        </button>
      </section>
      <section className={classes.expenses}>
        <h1> Day to day expenses</h1>

        <img src="expenses.jpg" alt="expenses" className={classes.img}></img>
      </section>
      <button className={classes.buttone} onClick={expensesHandler}>
        Track your expenses now
      </button>
    </Fragment>
  );
};

export default Welcome;
