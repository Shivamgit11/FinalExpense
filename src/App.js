import React, { useEffect } from "react";

import { Switch, Route } from "react-router-dom";

import AuthForm from "./Components/Authentication/authForm";
import Welcome from "./Components/Welcome/Welcome";
import Profile from "./Components/Profile/profile";
import Reset from "./Components/PasswordReset/Reset";
import Expenses from "./Components/Expenses/Expenses";
import { useDispatch, useSelector } from "react-redux";

import { expenseActions } from "./store/expense-slice";

function App() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.darkMode);
  const email = useSelector((state) => state.expense.email);
  console.log(email);

  useEffect(() => {
    if (!email) return;
    console.log("before fetch", email);
    fetch(
      `https://refreshexpense-default-rtdb.firebaseio.com/${email}.json`,
      {
        method: "GET",
      }
    )
      .then(async (res) => {
        const data = await res.json();
        console.log("In app js", data);
        for (const key in data) {
          const item = data[key];
          item.id = key;
          dispatch(expenseActions.addExpense(item));
        }
      })
      .catch((error) => {
        alert(error);
      });
  }, [dispatch, email]);

  return (
    <main
      style={
        theme
          ? { backgroundColor: "black", color: "red" }
          : { backgroundColor: "white" }
      }
    >
      <Switch>
        <Route path="/" exact>
          <AuthForm />
        </Route>

        <Route path="/auth">
          <AuthForm />
        </Route>
        <Route path="/welcome">
          <Welcome />
        </Route>

        <Route path="/profile">
          <Profile />
        </Route>

        <Route path="/passwdreset">
          <Reset />
        </Route>

        <Route path="/expenses">
          <Expenses />
        </Route>
      </Switch>
    </main>
  );
}

export default App;
