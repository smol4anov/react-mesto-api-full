import SignInUpForm from './SignInUpForm';
import { useForm } from "../hooks/useForm";

const initFields = {
  password: '',
  email: '',
};

const Login = (props) => {

  const { onLogin } = props;
  const { values, validationMessages, handleChange } = useForm(initFields, initFields);
  const allInputIsValid = !validationMessages.password && !validationMessages.email;

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(values);
  }

  return (
    <main className="page__main sing-in">
      <h2 className="sign-in__title">Вход</h2>
      <SignInUpForm
        buttonText="Войти"
        values={values}
        validationMessages={validationMessages}
        onChange={handleChange}
        onSubmit={handleSubmit}
        allInputIsValid={allInputIsValid}
      />
    </main>
  );
}

export default Login;