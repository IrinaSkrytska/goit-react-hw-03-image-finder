import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem';

const ImageGallery = ({ gallery }) => {
  return (
    <ul className={css.gallery}>
      {gallery.map(items => (
        <ImageGalleryItem key={items.id} item={items} />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  gallery: PropTypes.array.isRequired,
};

export default ImageGallery;
