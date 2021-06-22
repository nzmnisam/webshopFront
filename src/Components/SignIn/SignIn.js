import React, { useState, useEffect } from "react";
import "./SignIn.css";
import Button from "../Buttons/Button";
import { useHistory } from "react-router-dom";
import FormInput from "../Forms/FormInput/FormInput";

import {
  signInUser,
  signInAdmin,
  resetAuthForms,
} from "../../Redux/User/User.actions";

import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const mapState = ({ user }) => ({
  signInSuccess: user.signInSuccess,
  signInError: user.signInError,
});

const SignIn = (props) => {
  const { signInSuccess, signInError } = useSelector(mapState);
  const dispatch = useDispatch();
  const history = useHistory();

  //admin flag
  const [loginAsAdmin, setLoginAsAdmin] = useState(false);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (signInSuccess) {
      dispatch(resetAuthForms());
      history.push("/");
    }
  }, [signInSuccess]);

  window.addEventListener("beforeunload", (e) => {
    dispatch(resetAuthForms());
  });

  useEffect(() => {
    if (Array.isArray(signInError) && signInError.length > 0) {
      setErrors(signInError);
    }
  }, [signInError]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    dispatch(signInUser({ email, password }));
  };

  const handleAdminFormSubmit = (e) => {
    e.preventDefault();
    dispatch(signInAdmin({ username, password }));
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    setLoginAsAdmin(true);
  };
  return (
    <div className="signin">
      <div className="signin-container">
        <h2>Uloguj se</h2>
        <ErrorMessage errors={errors} />

        <div className="signin-formWrap">
          <form>
            {!loginAsAdmin && (
              <FormInput
                type="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="E-mail"
              />
            )}

            {loginAsAdmin && (
              <FormInput
                type="text"
                name="username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                placeholder="Korisničko ime"
              />
            )}

            <FormInput
              type="password"
              name="passsword"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Šifra"
            />
            {!loginAsAdmin && (
              <div className="socialSignin">
                <div className="row">
                  <Button
                    buttonStyle={"btn--signin"}
                    onClick={handleFormSubmit}
                  >
                    ULOGUJ SE
                  </Button>
                </div>
                <div className="row">
                  <Button
                    buttonStyle={"btn--signin--admin"}
                    onClick={handleAdminLogin}
                  >
                    ULOGUJ SE KAO ADMIN
                  </Button>
                </div>
              </div>
            )}

            {loginAsAdmin && (
              <div className="socialSignin">
                <div className="row">
                  <Button
                    buttonStyle={"btn--signin"}
                    onClick={handleAdminFormSubmit}
                  >
                    ULOGUJ SE
                  </Button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
