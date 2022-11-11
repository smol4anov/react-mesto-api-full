import { useState } from 'react';

export function useForm(inputValues, messages) {
  const [values, setValues] = useState(inputValues);
  const [validationMessages, setValidationMessages] = useState(messages);
  const handleChange = (event) => {
    const { value, name, validationMessage } = event.target;
    setValues({ ...values, [name]: value });
    setValidationMessages({ ...validationMessages, [name]: validationMessage });
  };
  return { values, validationMessages, handleChange, setValues, setValidationMessages };
}