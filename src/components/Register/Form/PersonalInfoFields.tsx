import { PersonalInfoProps } from '../types';
import FormField from './FieldForm';

function PersonalInfoFields({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  setFieldValue,
  withEmail = false
}: PersonalInfoProps): JSX.Element {
  return (
    <>
      <FormField
        name="firstName"
        label="First Name"
        type="text"
        placeholder="Enter your name"
        value={values.firstName}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.firstName}
        touched={touched.firstName}
      />
      <FormField
        name="lastName"
        label="Last Name"
        type="text"
        placeholder="Enter your last(family) name"
        value={values.lastName}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.lastName}
        touched={touched.lastName}
      />
      {withEmail && (
        <FormField
          name="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={values.email ?? ''}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
          touched={touched.email}
        />
      )}
      <FormField
        name="dateOfBirth"
        label="Date of Birth"
        type="text"
        placeholder="YYYY-MM-DD"
        value={values.dateOfBirth}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.dateOfBirth}
        touched={touched.dateOfBirth}
        withDatePicker
        onDatePick={(date) => setFieldValue('dateOfBirth', date)}
      />
      <FormField
        name="phoneNumber"
        label="Phone Number"
        type="text"
        placeholder="Enter your phone number"
        value={values.phoneNumber}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.phoneNumber}
        touched={touched.phoneNumber}
      />
    </>
  );
}

export default PersonalInfoFields;
