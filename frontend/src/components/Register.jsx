import SignInUpForm from './SignInUpForm';
import { Link } from 'react-router-dom';
import { useForm } from "../hooks/useForm";

const initFields = {
  password: '',
  email: '',
};

const Register = (props) => {

  const { onRegister } = props;
  const { values, validationMessages, handleChange } = useForm(initFields, initFields);
  const allInputIsValid = !validationMessages.password && !validationMessages.email;

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(values);
  }

  return (
    <main className="page__main sing-in">
      <h2 className="sign-in__title">Регистрация</h2>
      <SignInUpForm
        buttonText="Зарегистрироваться"
        values={values}
        validationMessages={validationMessages}
        onChange={handleChange}
        onSubmit={handleSubmit}
        allInputIsValid={allInputIsValid}
      />
      <p className="sign-in__footer-text">Уже зарегистрированы? <Link to="/signin" className="sign-in__footer-link">Войти</Link></p>
    </main>
  );
}

export default Register;