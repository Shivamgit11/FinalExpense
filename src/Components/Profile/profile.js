import React, { Fragment, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import { stringify } from "flatted";
import AuthContext from "../../store/auth-context";

import classes from "./profile.module.css";

const Profile = () => {
  const nameInputRef = useRef();
  const urlInputRef = useRef();

  const history = useHistory();
  const authCtx = useContext(AuthContext);
  console.log("token", authCtx.token)
  const token = localStorage.getItem("token");
  console.log("In local storage", token)

  fetch(
    "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCm1BvBfb655cubTMVdda30otMpIuOclhk",
    {
      method: "POST",
      body: JSON.stringify({
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
          /*if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }*/

          throw new Error(errorMessage);
        });
      }
    })
    .then((data) => {
      console.log("Profile details shown");
      console.log(data.users);
    })
    .catch((err) => {
      alert(err.message);
    });

  const mainPageHandler = () => {
    history.replace("/welcome");
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredUrl = urlInputRef.current.value;
    console.log(enteredName, enteredUrl);

    console.log(authCtx.token)

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCm1BvBfb655cubTMVdda30otMpIuOclhk",
      {
        method: "POST",
        body: stringify({
          idToken: token,
          emaildisplayName: enteredName,
          photoUrl: enteredUrl,
          returnSecureToken: true,
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
            let errorMessage = "Could not update profile";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        alert("Profile has been updated");
        console.log("Profile updated succesfully");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <Fragment>
      <section>
        <h1 className={classes.h1}> Update your profile </h1>
      </section>
      <button onClick={mainPageHandler}> Go to main page </button>
      <section>
        <h2 className={classes.h2}> Contact Details </h2>
        <form onSubmit={submitHandler}>
          <div className={classes.div}>
            <label htmlFor="name" className={classes.label}>
              Full name
            </label>
            <input type="text" id="name" ref={nameInputRef} />

            <label htmlFor="photo" className={classes.label}>
              Photo URL
            </label>
            <input type="text" id="photo" ref={urlInputRef} />
          </div>
          <div className={classes.div2}>
            <button className={classes.button}> Update Profile </button>
          </div>
        </form>
      </section>
    </Fragment>
  );
};

export default Profile;
