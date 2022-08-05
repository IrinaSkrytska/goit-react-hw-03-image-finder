import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem';

const ImageGallery = ({ images, onModalClick }) => {
  return (
    <ul className={css.gallery}>
      {images.map(({ id, webformatURL, tags, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          tags={tags}
          onModal={onModalClick}
          largeImageURL={largeImageURL}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  onModalClick: PropTypes.func.isRequired,
  id: PropTypes.string,
  webformatURL: PropTypes.string,
  tags: PropTypes.string,
};

export default ImageGallery;
