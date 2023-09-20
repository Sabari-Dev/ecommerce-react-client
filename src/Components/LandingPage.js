import React, { useState } from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import "../style/LandingPage.css";

const LandingPage = () => {
  const [isSignUpActive, setIsSignUpActive] = useState(false);

  const handleSignUpClick = () => {
    setIsSignUpActive(true);
  };

  const handleSignInClick = () => {
    setIsSignUpActive(false);
  };
  return (
    <div className="landing-page">
      <div
        className={`container ${isSignUpActive ? "right-panel-active" : ""}`}
        id="container"
      >
        <div
          className={`form-container sign-up-container ${
            isSignUpActive ? "right-panel-active" : ""
          }`}
        >
          <SignUp />
        </div>
        <div
          className={`form-container sign-in-container ${
            isSignUpActive ? "" : "right-panel-active"
          }`}
        >
          <SignIn />
        </div>
        <div className="overlay-container">
          <div
            className={`overlay ${isSignUpActive ? "right-panel-active" : ""}`}
          >
            <div
              className={`overlay-panel overlay-left ${
                isSignUpActive ? "right-panel-active" : ""
              }`}
            >
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button className="ghost" onClick={handleSignInClick}>
                Sign In
              </button>
            </div>
            <div
              className={`overlay-panel overlay-right ${
                isSignUpActive ? "right-panel-active" : ""
              }`}
            >
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start the journey with us</p>
              <button className="ghost" onClick={handleSignUpClick}>
                Sign Up
              </button>
              <div className="test">
                <hr />
                <h2>Here is the test Account</h2>
                <div className="email">Email : test@gmail.com</div>
                <div className="pass">Password: Test@1234</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
