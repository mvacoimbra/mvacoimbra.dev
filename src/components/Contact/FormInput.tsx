import { UseFormRegister } from 'react-hook-form';

export type InputType = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export type FormInputProps = {
  register: UseFormRegister<any>;
  name: InputType;
};

export default function FormInput({ register, name }: FormInputProps) {
  return (
    <div className={'col-span-2'}>
      <label htmlFor='name'>Nome</label>
      <input
        className='placeholder:text-black text-black'
        placeholder='Thomas Anderson'
      />
    </div>
  );
}
