import { takeLatest, call, all } from "redux-saga/effects";
import userTypes from "./User.types";
import { signInSucces } from "./User.actions";

export function* emailSignIn({ payload: { email, password } }) {}

export function* onEmailSignInStart() {
  yield takeLatest(userTypes.EMAIL_SIGN_IN_START, emailSignIn);
}
