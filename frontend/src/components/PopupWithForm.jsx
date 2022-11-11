import { useState, useEffect } from "react";

const PopupWithForm = props => {
  const { title, name, children, buttonText, isOpen, onClose, onSubmit, validOnOpen = false } = props;

  const [isValidForm, setIsValidForm] = useState(false);

  const popupOpened = isOpen ? "popup_opened" : "";
  const popusClassList = `popup popup_type_${name} ${popupOpened}`;
  const submitButtonClassList = isValidForm ? "popup__submit" : "popup__submit popup__submit_inactive";

  const handleEscClose = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }

  const handleMousedown = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit();
  }

  const handleChange = (e) => {
    const allInputsValid = [...e.currentTarget.elements].every(elem => {
      if (elem.tagName === 'INPUT' && elem.type !== 'submit') return elem.validity.valid;
      return true;
    });
    setIsValidForm(allInputsValid);
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscClose);
      setIsValidForm(validOnOpen);
    }
    else {
      document.removeEventListener('keydown', handleEscClose);
    }
  }, [isOpen]);

  return (
    <div className={popusClassList} onMouseDown={handleMousedown} >
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form name={`${name}-form`} action="#" className="popup__form" noValidate onSubmit={handleSubmit} onChange={handleChange}>
          {children}
          <button className={submitButtonClassList} type="submit" disabled={!isValidForm}>{buttonText}</button>
        </form>
        <button type="button" className="popup__close" onClick={onClose}></button>
      </div>
    </div>
  );
}

export default PopupWithForm;