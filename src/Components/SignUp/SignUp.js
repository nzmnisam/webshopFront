import React, { useState, useEffect } from "react";
import Button from "../Buttons/Button";
import "./SignUp.css";
import FormInput from "../Forms/FormInput/FormInput";
import { useHistory } from "react-router-dom";

import { resetAuthForms, signUpUser } from "../../Redux/User/User.actions";
import { setCities } from "../../Redux/City/City.actions";
import { useSelector, useDispatch } from "react-redux";
import FormSelect from "../Forms/FromSelect/FormSelect";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const mapState = ({ user, cities }) => ({
  signUpSuccess: user.signUpSuccess,
  signUpError: user.signUpError,
  allCities: cities.cities,
});

const SignUp = (props) => {
  const { signUpSuccess, signUpError, allCities } = useSelector(mapState);
  const dispatch = useDispatch();
  const history = useHistory();

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
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

  window.addEventListener("beforeunload", (e) => {
    dispatch(resetAuthForms());
  });

  useEffect(() => {
    if (allCities.length === 0) {
      dispatch(setCities());
    }
  }, []);

  const renameCityKeys = (cities) => {
    cities = cities.map((city) => {
      city["value"] = city["postanski_broj"];
      city["name"] = city["naziv"];
      // delete city["postanski_broj"];
      // delete city["naziv"];
      return city;
    });
    return cities;
  };

  const cityOptions = () => {
    const cities = renameCityKeys(allCities);
    cities.unshift({
      value: 0,
      name: "Izaberite grad",
    });
    return cities;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    dispatch(
      signUpUser({ displayName, email, password, confirmPassword, city })
    );
  };

  return (
    <div className="signup">
      <div className="signup-container">
        <h2>Napravi nalog</h2>

        <ErrorMessage errors={errors} />

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
            <FormSelect
              name="city"
              value={city}
              options={cityOptions()}
              onChange={(e) => {
                setCity(e.target.value);
              }}
              placeholder="City"
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
