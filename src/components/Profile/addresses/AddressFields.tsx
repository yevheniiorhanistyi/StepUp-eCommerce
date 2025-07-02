import { Switch } from '@/components/ui/switch';
import FormField from '../../Register/Form/FieldForm';

import { countries } from '@/constants/constants';
import { AddressInfoProps } from '../../../types/profile';

const countryOptions = countries.map((c) => ({ value: c.code, label: c.name }));

function AddressFields({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  setFieldValue,
  withSwitch = false
}: AddressInfoProps): JSX.Element {
  const addressFields = [
    { name: 'country', label: 'Country', placeholder: 'Enter your country' },
    { name: 'city', label: 'City', placeholder: 'Enter your city' },
    { name: 'streetName', label: 'Street Name', placeholder: 'Enter your street' },
    { name: 'postalCode', label: 'Postal code', placeholder: 'Enter your postal code' }
  ];

  return (
    <fieldset className="flex gap-5 flex-wrap">
      <legend className="basis-full text-[16px] font-bold w-full border-b-2 border-b-black not-last:mb-2.5">
        Address Information
      </legend>
      {addressFields.map((field) => {
        return (
          <FormField
            key={field.label}
            name={field.name}
            label={field.label}
            placeholder={field.placeholder}
            value={values[field.name]}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors[field.name]}
            touched={touched[field.name]}
            asSelect={field.name === 'country'}
            options={field.name === 'country' ? countryOptions : undefined}
          />
        );
      })}
      {withSwitch && (
        <div className="flex grow items-center justify-between">
          <label htmlFor={`isDefault`} className="font-medium">
            Use address as default
          </label>
          <Switch
            className="hover:cursor-pointer"
            id={`isDefault`}
            name="isDefault"
            checked={values.isDefault}
            onCheckedChange={(checked) => {
              setFieldValue(`isDefault`, checked);
            }}
          />
        </div>
      )}
    </fieldset>
  );
}

export default AddressFields;
