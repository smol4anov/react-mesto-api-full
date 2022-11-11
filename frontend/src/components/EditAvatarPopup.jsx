import { useRef, useState, useEffect } from "react";
import PopupWithForm from './PopupWithForm';

const EditAvatarPopup = props => {
  const { isOpen, onClose, onUpdateAvatar, savingState } = props;

  const avatarUrlRef = useRef();

  const [validationState, setValidationState] = useState({
    isValid: false,
    errorMessage: '',
  });

  const buttonText = savingState ? "Сохранение..." : "Сохранить";

  function handleSubmit() {
    onUpdateAvatar({
      avatar: avatarUrlRef.current.value,
    });
  }

  const handleChange = () => {
    setValidationState({
      isValid: avatarUrlRef.current.validity.valid,
      errorMessage: avatarUrlRef.current.validationMessage
    });
  }

  const inputClassList = `popup__input ${(!validationState.errorMessage) ? '' : 'popup__input_type_error'}`;
  const errorSpanClassList = `popup__input-error ${(!validationState.errorMessage) ? '' : 'popup__input-error_active'}`;

  useEffect(() => {
    if (isOpen) {
      avatarUrlRef.current.value = '';
      setValidationState({
        isValid: false,
        errorMessage: '',
      });
    };
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar-edit"
      children={(
        <>
          <input
            className={inputClassList}
            type="url"
            id="avatar"
            name="avatar"
            required
            placeholder="Ссылка на картинку"
            ref={avatarUrlRef}
            onChange={handleChange}
          />
          <span className={errorSpanClassList}>{validationState.errorMessage}</span>
        </>
      )}
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      isValid={validationState.isValid}
      onSubmit={handleSubmit}
    />
  );
}

export default EditAvatarPopup;