import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ item }) => {
  return (
    <li className={css.gallery_item}>
      <img
        className={css.ImageGalleryItem_image}
        src={item.webformatURL}
        alt={item.tags}
        loading="lazy"
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    webformatURL: PropTypes.string,
    tags: PropTypes.string,
  }),
};

export default ImageGalleryItem;
