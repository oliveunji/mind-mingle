import React from "react";
import huggingLogo from '../assets/hugging_logo.png'

const RegisterPage = () => {
  return (
    <div style={styles.registerPage}>
      <div className="container">
        <h1 className="heading">Your Thoughts,<br />Freely Shared</h1>
        <p className="subheading">
            Speak your mind in a safe, non-judgmental
            space, where your feelings truly matter.
        </p>
        <img src={huggingLogo} alt="Hugging Logo" className="image" />
      </div>
    </div>
  );
};

const styles = {
  registerPage: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#fff",
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
  },
};

export default RegisterPage;
