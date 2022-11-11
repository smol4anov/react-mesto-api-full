import { useContext } from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Card = props => {
  const { card, onCardClick, onCardLike, onCardDelete } = props;

  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;

  const cardDeleteButtonClassName = (`element__delete ${isOwn ? '' : 'element__delete_hidden'}`);

  const isLiked = card.likes.some(item => item._id === currentUser._id);
  const cardLikeButtonClassName = (`element__button ${isLiked ? 'element__button_active' : ''}`);

  const handleClick = () => {
    onCardClick(card);
  }

  const handleLikeClick = () => {
    onCardLike(card);
  }

  const handleDeleteClick = () => {
    onCardDelete(card);
  }

  return (
    <div className="element">
      <img src={card.link} alt={card.name} className="element__image" onClick={handleClick} />
      <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick} ></button>
      <div className="element__content">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__likes">
          <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick} ></button>
          <span className="element__likes-counter">{card.likes.length}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;