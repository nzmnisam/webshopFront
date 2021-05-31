import React, { useState } from "react";
import Button from "../Buttons/Button";
import "./SignUp.css";
import FormInput from "../Forms/FormInput/FormInput";
import { useHistory } from "react-router-dom";

import { setCurrentUser } from "../../Redux/User/User.actions";
import { connect } from "react-redux";

const SignUp = (props) => {
  const history = useHistory();
  const { currentUser, setCurrentUser } = props;

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      const error = ["Šifre se ne podudaraju"];
      setErrors(error);
      return;
    }

    try {
      await props.api
        .post(`/register`, {
          name: displayName,
          email: email,
          password: password,
          password_confirmation: confirmPassword,
        })
        .then((res) => {
          const { user } = res.data;
          // localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("token", res.data.token);

          setCurrentUser(user);

          history.push("/");
        });
    } catch (error) {
      console.log(error);
    }
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
const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
