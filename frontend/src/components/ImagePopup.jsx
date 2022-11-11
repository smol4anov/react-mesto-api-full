import { useEffect } from "react";

const ImagePopup = (props) => {
  const { card, onClose } = props;

  let name = '', link = '', popupOpenedClass = '';

  if (card) {
    name = card.name;
    link = card.link;
    popupOpenedClass = 'popup_opened';
  }

  const popupClassName = `popup popup_type_open-image ${popupOpenedClass}`;

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

  useEffect(() => {
    if (card) {
      document.addEventListener('keydown', handleEscClose);
    }
    else {
      document.removeEventListener('keydown', handleEscClose);
    }
  }, [card]);

  return (
    <div className={popupClassName} onMouseDown={handleMousedown} >
      <div className="popup__wrapper">
        <h3 className="popup__subtitle">{name}</h3>
        <img src={link} alt={name} className="popup__image" />
        <button type="button" className="popup__close" onClick={onClose}></button>
      </div>
    </div>
  );
}

export default ImagePopup;