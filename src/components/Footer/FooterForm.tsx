'use client';

import { Form, Formik, ErrorMessage } from 'formik';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import SubscribeSchema from './SubscribeSchema';

const FooterForm = (): JSX.Element => {
  return (
    <Formik
      initialValues={{
        email: ''
      }}
      validationSchema={SubscribeSchema}
      onSubmit={(values, { resetForm }) => {
        toast.success(`Thanks for subscribing, ${values.email}!`);
        resetForm();
      }}
    >
      {({ errors, touched, values, handleChange, handleBlur }) => (
        <Form className="flex items-center justify-between gap-5 relative">
          <Input
            name="email"
            className={cn(
              'border-0 border-b-1 rounded-none px-0 py-1 bg-transparent focus-visible:ring-0',
              errors.email && touched.email
                ? 'border-red-500 focus:border-red-500'
                : 'border-gray-300 focus:border-black'
            )}
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter your email"
          />

          <ErrorMessage name="email">
            {(msg) => (
              <span className="text-sm text-destructive absolute bottom-[-25px] left-0">{msg}</span>
            )}
          </ErrorMessage>
          <Button className="cursor-pointer" type="submit" variant="secondary">
            Subscribe
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default FooterForm;
