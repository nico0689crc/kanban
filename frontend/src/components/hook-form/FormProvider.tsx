import { FormProvider as Form, UseFormReturn } from 'react-hook-form';

type Props = {
  children: React.ReactNode;
  methods: UseFormReturn<any>;
  onSubmit?: VoidFunction;
  alignItems?: string
};

const FormProvider = ({ children, onSubmit, methods }: Props) => {
  return (
    <Form {...methods}>
      <form style={{ width: '100%' }} onSubmit={onSubmit}>{children}</form>
    </Form>
  );
}

export default FormProvider;
