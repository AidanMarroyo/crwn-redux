import { takeLatest, all, call, put } from 'redux-saga/effects'

import { USER_ACTION_TYPES } from './user-types'

import {
  signInSuccess,
  signInFailed,
  signUpSuccess,
  signUpFailed,
} from './user-actions'

import {
  getCurrentUser,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
  createAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils'

export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
  try {
    const userSnapshot = yield call(
      createUserDocumentFromAuth,
      userAuth,
      additionalDetails
    )
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }))
  } catch (error) {
    yield put(signInFailed(error))
  }
}
export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser)
    if (!userAuth) return
    yield call(getSnapshotFromUserAuth, userAuth)
  } catch (error) {
    yield put(signInFailed(error))
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield call(signInWithGooglePopup)
    yield call(getSnapshotFromUserAuth, user)
  } catch (error) {
    yield put(signInFailed(error))
  }
}

export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield call(
      signInAuthUserWithEmailAndPassword,
      email,
      password
    )
    yield call(getSnapshotFromUserAuth, user)
  } catch (error) {
    yield put(signInFailed(error))
  }
}

export function* signUpEmail({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    )
    yield put(signUpSuccess(user, { displayName }))
  } catch (error) {
    yield put(signUpFailed(error))
  }
}

export function* signInAfterSignUp({ payload: { user, additionalDetails } }) {
  yield call(getSnapshotFromUserAuth, user, additionalDetails)
}

// ** ENTRY POINT SAGAS START ** //
export function* onGoogleSignIn() {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onEmailSignIn() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* onEmailSignUp() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUpEmail)
}

export function* onSignUpSuccess() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* checkUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated)
}
// ** ENTRY POINT SAGAS END ** //

export function* userSaga() {
  yield all([
    call(checkUserSession),
    call(onGoogleSignIn),
    call(onEmailSignIn),
    call(onEmailSignUp, call(onSignUpSuccess)),
  ])
}
