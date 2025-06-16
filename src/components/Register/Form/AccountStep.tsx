import { useState } from 'react';
import FormField from './FieldForm';
import { RegisterFormProps } from '../../../types/register';

function AccountStep(props: RegisterFormProps): JSX.Element {
  const { values, errors, touched, handleChange, handleBlur } = props;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <>
      <FormField
        name="email"
        label="Email"
        type="email"
        placeholder="Enter your email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.email}
        touched={touched.email}
      />
      <FormField
        name="password"
        label="Password"
        placeholder="Enter your password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.password}
        touched={touched.password}
        withToggle
        show={showPassword}
        onToggle={() => setShowPassword(!showPassword)}
      />
      <FormField
        name="confirmPassword"
        label="Confirm password"
        placeholder="Confirm your password"
        value={values.confirmPassword}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.confirmPassword}
        touched={touched.confirmPassword}
        withToggle
        show={showConfirmPassword}
        onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
      />
    </>
  );
}
export default AccountStep;
