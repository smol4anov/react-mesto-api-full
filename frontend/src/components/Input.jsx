const Input = (props) => {
  const { type, name, placeholder, minlength, maxlength, value, validationMessage, onChange, classNamePrefix="popup" } = props;

  const inputModifier = !validationMessage ? '' : `${classNamePrefix}__input_type_error`;
  const inputClassList = `${classNamePrefix}__input ${inputModifier}`;
  const errorSpanModifier = !validationMessage ? '' : `${classNamePrefix}__input-error_active`;
  const errorSpanClassList = `${classNamePrefix}__input-error ${errorSpanModifier}`;

  return (
    <>
      <input
        className={inputClassList}
        type={type}
        id={name}
        name={name}
        required
        minLength={minlength}
        maxLength={maxlength}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <span className={errorSpanClassList}>{validationMessage}</span>
    </>
  );
}

export default Input;