import React, { useState, useEffect } from "react";
import Button from "../Buttons/Button";
import "./SignUp.css";
import FormInput from "../Forms/FormInput/FormInput";
import { useHistory } from "react-router-dom";

import { resetAuthForms, signUpUser } from "../../Redux/User/User.actions";
import { useSelector, useDispatch } from "react-redux";

const mapState = ({ user }) => ({
  signUpSuccess: user.signUpSuccess,
  signUpError: user.signUpError,
});

const SignUp = (props) => {
  const { signUpSuccess, signUpError } = useSelector(mapState);
  const dispatch = useDispatch();
  const history = useHistory();

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (signUpSuccess) {
      dispatch(resetAuthForms());
      history.push("/");
    }
  }, [signUpSuccess]);

  useEffect(() => {
    if (Array.isArray(signUpError) && signUpError.length > 0) {
      setErrors(signUpError);
    }
  }, [signUpError]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    dispatch(signUpUser({ displayName, email, password, confirmPassword }));
  };

  return (
    <div className="signup">
      <div className="signup-container">
        <h2>Napravi nalog</h2>

        {errors.length > 0 && (
          <ul>
            {errors.map((error, i) => {
              return <li key={i}>{error}</li>;
            })}
          </ul>
        )}

        <div className="signup-formWrap">
          <form onSubmit={handleFormSubmit}>
            <FormInput
              type="text"
              name="displayName"
              value={displayName}
              onChange={(e) => {
                setDisplayName(e.target.value);
              }}
              placeholder="Ime i Prezime"
            />

            <FormInput
              type="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="E-mail"
            />

            <FormInput
              type="password"
              name="passsword"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Šifra"
            />

            <FormInput
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              placeholder="Potvrdi šifru"
            />

            <Button buttonStyle={"btn--signin"}>POTVRDI</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
