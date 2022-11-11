import { useEffect } from "react";
import unionSuccess from '../images/Union-success.png';
import unionFail from '../images/Union-fail.png';

const InfoTooltip = props => {
  const { isOpen, onClose, success = true } = props;

  const popusClassList = `popup ${isOpen ? "popup_opened" : ""}`;

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

  const src = success ? unionSuccess : unionFail;
  const alt = success ? "Success" : "Fail";
  const tooltipText = success ? 'Вы успешно зарегистрировались!'
    : 'Что-то пошло не так! Попробуйте ещё раз.';

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscClose);
    }
    else {
      document.removeEventListener('keydown', handleEscClose);
    }
  }, [isOpen]);

  return (
    <div className={popusClassList} onMouseDown={handleMousedown} >
      <div className="popup__container">
        <img className="popup__tooltip-image" src={src} alt={alt} />
        <h2 className="popup__title popup__title_tooltip">{tooltipText}</h2>
        <button type="button" className="popup__close" onClick={onClose}></button>
      </div>
    </div>
  );
}

export default InfoTooltip;