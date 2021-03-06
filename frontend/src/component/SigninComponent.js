import { signin, autheticate, isAuth } from "../action/authAcation";
import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Button } from "@mui/material";

const SigninComponent = ({ history }) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    message: "",
    showForm: true,
  });

  const { email, password, error, loading, message, showForm } = values;

  useEffect(() => {
    isAuth() && history.push("/admin/accounts");
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.table({ name, email, password, error, loading, message, showForm });

    setValues({ ...values, loading: true, error: false });
    const user = { email, password };

    signin(user).then((data) => {
      try {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          //save user token to cookie
          //save user info to localStroage
          //authenticate user
          autheticate(data, () => {
            if (isAuth()) {
              history.push("/admin/accounts");
            } else {
              history.push("/auth/signin");
            }
          });
        }
      } catch (err) {
        console.log(err);
      }
    });
  };

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const showLaoding = () =>
    loading ? <div className="alert alert-info">Loading...</div> : "";
  const showError = () =>
    error ? <div className="alert alert-danger">{error}</div> : "";
  const showMessage = () =>
    message ? <div className="alert alert-info">{message}</div> : "";

  const signinForm = () => {
    return (
      <>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              value={email}
              onChange={handleChange("email")}
              type="email"
              style={{ borderRadius: "12px", textAlign: "center" }}
              className="form-control"
              placeholder="Type your email"
            />
            <br />

            <input
              value={password}
              style={{ borderRadius: "12px", textAlign: "center" }}
              onChange={handleChange("password")}
              type="password"
              className="form-control"
              placeholder="Type your password"
            />
          </div>

          <div className="text-center block">
            <button
              style={{
                marginTop: "15px",
                marginLeft: "12px",
                cursor: "pointer",
                padding: "0 70px 1px 70px ",
              }}
              class="btn btn-primary btn-lg btn-block"
            >
              Sign In
            </button>
          </div>
        </form>
      </>
    );
  };

  return (
    <div className="container">
      {showLaoding()}
      {showError()}
      {showMessage()}
      {showForm && signinForm()}
    </div>
  );
};

export default withRouter(SigninComponent);
