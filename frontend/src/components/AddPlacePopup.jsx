import { useEffect } from "react";
import PopupWithForm from './PopupWithForm';
import Input from './Input';
import { useForm } from "../hooks/useForm";

const initFields = {
  place: '',
  image: '',
};

const AddPlacePopup = props => {
  const { isOpen, onClose, onAddPlace, savingState } = props;
  const { values, validationMessages, handleChange, setValues, setValidationMessages } = useForm(initFields, initFields);

  const buttonText = savingState ? "Сохранение..." : "Создать";

  const handleSubmit = () => {
    onAddPlace({ name: values.place, link: values.image });
  }

  useEffect(() => {
    if (isOpen) {
      setValues(initFields);
      setValidationMessages(initFields);
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Новое место"
      name="new-place"
      children={(
        <>

          <Input
            type="text"
            name="place"
            required
            minlength="2"
            maxlength="30"
            placeholder="Название"
            value={values.place}
            validationMessage={validationMessages.place}
            onChange={handleChange}
          />
          <Input
            type="url"
            name="image"
            required
            placeholder="Ссылка на картинку"
            value={values.image}
            validationMessage={validationMessages.image}
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

export default AddPlacePopup;