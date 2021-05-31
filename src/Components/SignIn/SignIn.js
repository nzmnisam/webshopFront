import React, { useState } from "react";
import "./SignIn.css";
import Button from "../Buttons/Button";
import { useHistory } from "react-router";
import FormInput from "../Forms/FormInput/FormInput";

import { setCurrentUser } from "../../Redux/User/User.actions";
import { connect } from "react-redux";

const SignIn = (props) => {
  const history = useHistory();
  const { currentUser } = props;

  //admin flag
  const [loginAsAdmin, setLoginAsAdmin] = useState(false);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      const error = ["Niste uneli E-mail"];
      setErrors(error);
      return;
    }
    if (!password) {
      const error = ["Niste uneli šifru"];
      setErrors(error);
      return;
    }

    try {
      await props.api
        .post(`/login`, {
          email: email,
          password: password,
        })
        .then((res) => {
          const { user } = res.data;
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("token", res.data.token);

          props.setCurrentUser(user);

          history.push("/");
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdminFormSubmit = async (e) => {
    e.preventDefault();
    if (!username) {
      const error = ["Niste uneli korisničko ime"];
      setErrors(error);
      return;
    }
    if (!password) {
      const error = ["Niste uneli šifru"];
      setErrors(error);
      return;
    }

    try {
      await props.api
        .post(`/login/admin`, {
          username: username,
          password: password,
        })
        .then((res) => {
          const { admin } = res.data;
          localStorage.setItem("admin", JSON.stringify(admin));
          localStorage.setItem("token", res.data.token);

          props.setCurrentUser(admin);

          history.push("/");
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    setLoginAsAdmin(true);
  };
  return (
    <div className="signin">
      <div className="signin-container">
        <h2>Uloguj se</h2>
        {errors.length > 0 && (
          <ul>
            {errors.map((error, i) => {
              return <li key={i}>{error}</li>;
            })}
          </ul>
        )}

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
const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
