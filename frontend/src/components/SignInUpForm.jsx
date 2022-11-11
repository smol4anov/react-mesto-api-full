import Input from './Input';

const SignInUpForm = (props) => {

  const { buttonText, onSubmit, onChange, values, validationMessages, allInputIsValid } = props;

  return (
    <form action="#" className="sign-in__form" onSubmit={onSubmit}>
      <Input
        type="email"
        name="email"
        classNamePrefix="sign-in"
        required
        placeholder="Email"
        value={values.email}
        validationMessage={validationMessages.email}
        onChange={onChange}
      />
      <Input
        type="password"
        name="password"
        classNamePrefix="sign-in"
        required
        placeholder="Пароль"
        minlength="6"
        maxlength="30"
        value={values.password}
        validationMessage={validationMessages.password}
        onChange={onChange}
      />
      <button className="sign-in__button" type="submit" disabled={!allInputIsValid}>{buttonText}</button>
    </form>
  );
}

export default SignInUpForm;