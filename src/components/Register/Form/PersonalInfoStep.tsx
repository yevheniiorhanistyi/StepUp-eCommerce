import { Switch } from '@/components/ui/switch';
import { RegisterFormProps } from '../types';
import FormField from './FieldForm';
import PersonalInfoFields from './PersonalInfoFields';

function PersonalInfoStep(props: RegisterFormProps): JSX.Element {
  const { values, errors, touched, handleChange, handleBlur, setFieldValue } = props;

  return (
    <>
      <PersonalInfoFields {...props}></PersonalInfoFields>

      {renderAddressFields(
        { values, errors, touched, handleChange, handleBlur, setFieldValue },
        'billingAddress'
      )}
      <div className="flex items-center justify-between">
        <label htmlFor="useSame" className="font-medium">
          Use same address for shipping
        </label>
        <Switch
          className="hover:cursor-pointer"
          id="useSame"
          name="useSame"
          checked={values.shippingAddress.useSame}
          onCheckedChange={(checked) => {
            setFieldValue('shippingAddress.useSame', checked);
          }}
        />
      </div>
      {!values.shippingAddress.useSame && (
        <>
          {renderAddressFields(
            { values, errors, touched, handleChange, handleBlur, setFieldValue },
            'shippingAddress'
          )}
        </>
      )}
    </>
  );
}

function renderAddressFields(
  props: RegisterFormProps,
  label: 'billingAddress' | 'shippingAddress'
): JSX.Element {
  const { values, errors, touched, handleChange, handleBlur } = props;
  const addressFields = [
    { name: 'country', label: 'Country', placeholder: 'Enter your country' },
    { name: 'city', label: 'City', placeholder: 'Enter your city' },
    { name: 'streetName', label: 'Street', placeholder: 'Enter your street' },
    { name: 'postalCode', label: 'Postal code', placeholder: 'Enter your postal code' }
  ];

  return (
    <fieldset className="flex gap-7 flex-wrap">
      <legend className="basis-full text-[16px] font-bold w-full border-b-2 border-b-black not-last:mb-2.5">
        {label === 'billingAddress' ? 'Billing Address' : 'Shipping Address'}
      </legend>
      {addressFields.map((field) => {
        return (
          <FormField
            key={field.label}
            name={`${label}.${field.name}`}
            label={field.label}
            placeholder={field.placeholder}
            value={values[label]?.[field.name]}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors[label]?.[field.name]}
            touched={touched[label]?.[field.name]}
          />
        );
      })}
    </fieldset>
  );
}

export default PersonalInfoStep;
