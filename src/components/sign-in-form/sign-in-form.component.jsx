import { useState } from 'react'
import { useDispatch } from 'react-redux'

import FormInput from '../form-input/form-input.component'
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component'

import {
  googleSignInStart,
  emailSignInStart,
} from '../../store/user/user-actions'

import {
  SignInContainer,
  SecondaryTitle,
  ButtonsContainer,
} from './sign-in-form.styles'

const defaultFormFields = {
  email: '',
  password: '',
}

const SignInForm = () => {
  const dispatch = useDispatch()
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { email, password } = formFields

  // empties form fields after button submit
  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  //Sign in using Google Popup
  const popUpGoogleUser = async () => {
    dispatch(googleSignInStart())
  }

  // function that handles button submit
  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      dispatch(emailSignInStart(email, password))

      resetFormFields()
    } catch (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          alert('incorrect password or email')
          break
        case 'auth/user-not-found':
          alert('incorrect password or email')
          break
        default:
          console.log(error)
      }
    }
  }

  // function that handles form input changes
  const handleChange = (event) => {
    const { name, value } = event.target

    setFormFields({ ...formFields, [name]: value })
  }
  return (
    <SignInContainer>
      <SecondaryTitle>Already have an account?</SecondaryTitle>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Email'
          type='email'
          required
          onChange={handleChange}
          name='email'
          value={email}
        ></FormInput>

        <FormInput
          label='Password'
          type='password'
          required
          onChange={handleChange}
          name='password'
          value={password}
        ></FormInput>

        <ButtonsContainer>
          <Button type='submit'>Sign in</Button>
          <Button
            onClick={popUpGoogleUser}
            buttonType={BUTTON_TYPE_CLASSES.google}
            type='button'
          >
            Google Sign in
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  )
}

export default SignInForm
