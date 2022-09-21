import { FormInputLabel, Input, Group } from './form-input.styles'

const FormInput = ({ label, ...otherProps }) => {
  return (
    <Group>
      <Input
        {...otherProps}
        //   type='text'
        //   required
        //   onChange={handleChange}
        //   name='displayName'
        //   value={displayName}
        //   commented out props replaced by {...otherProps} which spreads out all remaining props found in sign up form component
      ></Input>

      {/* This states: if label tag exists, then render the following:  */}
      {label && (
        <FormInputLabel shrink={otherProps.value.length}>
          {label}
        </FormInputLabel>
      )}
    </Group>
  )
}

export default FormInput
