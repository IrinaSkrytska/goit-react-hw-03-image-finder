import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ webformatURL, tags, onModal, largeImageURL }) => {
  return (
    <li className={css.gallery_item}>
      <img
        className={css.ImageGalleryItem_image}
        src={webformatURL}
        alt={tags}
        loading="lazy"
        onClick={() => onModal(largeImageURL)}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  tags: PropTypes.string,
  largeImageURL: PropTypes.string,
  onModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
