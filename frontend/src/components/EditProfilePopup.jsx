import { useContext, useEffect } from "react";
import PopupWithForm from './PopupWithForm';
import Input from './Input';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useForm } from "../hooks/useForm";

const initFields = {
  name: '',
  description: '',
};

const EditProfilePopup = props => {
  const { isOpen, onClose, onUpdateUser, savingState } = props;
  const { values, validationMessages, handleChange, setValues, setValidationMessages } = useForm(initFields, initFields);

  const currentUser = useContext(CurrentUserContext);

  const buttonText = savingState ? "Сохранение..." : "Сохранить";

  const handleSubmit = () => {
    onUpdateUser({ name: values.name, about: values.description });
  }

  useEffect(() => {
    if (isOpen) {
      setValues({
        name: currentUser.name || '',
        description: currentUser.about || ''
      });
      setValidationMessages(initFields);
    }
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      children={(
        <>
          <Input
            type="text"
            name="name"
            required
            minlength="2"
            maxlength="40"
            placeholder="Имя"
            value={values.name}
            validationMessage={validationMessages.name}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="description"
            required
            minlength="2"
            maxlength="200"
            placeholder="О себе"
            value={values.description}
            validationMessage={validationMessages.description}
            onChange={handleChange}
          />
        </>
      )}
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}

export default EditProfilePopup;