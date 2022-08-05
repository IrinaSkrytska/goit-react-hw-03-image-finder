import { Component } from 'react';
import PropTypes from 'prop-types';
import fetchImages from 'services/pixabay-api';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal';
import Loader from './Loader';

export class App extends Component {
  static propTypes = {
    state: PropTypes.arrayOf(
      PropTypes.exact({
        searchKey: PropTypes.string,
        gallery: PropTypes.array,
        page: PropTypes.number.isRequired,
        largeImage: PropTypes.string,
        largeImageAlt: PropTypes.string,
        status: PropTypes.string.isRequired,
      })
    ),
  };

  state = {
    searchKey: '',
    gallery: [],
    page: 1,
    largeImage: '',
    largeImageAlt: '',
    showModal: false,
    loading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchKey, page } = this.state;

    const prevSearchInput = prevState.searchKey;
    const nextSearchInput = searchKey;
    const prevPage = prevState.page;
    const nextPage = page;

    if (nextSearchInput !== prevSearchInput) {
      this.setState({ loading: true });

      fetchImages(nextSearchInput, nextPage)
        .then(result => {
          if (result.length === 0) {
            alert('No images found');
          }

          this.setState({ gallery: result });
        })
        .catch(error => console.log(error))
        .finally(() => this.setState({ loading: false }));
    }

    if (prevPage !== nextPage && nextPage !== 1) {
      this.setState({ loading: true });

      fetchImages(nextSearchInput, nextPage)
        .then(result => {
          this.setState(prevState => ({
            gallery: [...prevState.gallery, ...result],
          }));
        })
        .catch(error => console.log(error))
        .finally(() => this.setState({ loading: false }));
    }
  }

  onFormSubmitHandler = ({ searchInput }) => {
    this.setState({ searchKey: searchInput, page: 1 });
  };

  onLoadButtonClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  openModal = largeImageURL => {
    this.setState({ showModal: true });
    this.setState({ largeImage: largeImageURL });
  };

  closeModal = evt => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { gallery, showModal, largeImage, loading } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.onFormSubmitHandler} />
        <ImageGallery images={gallery} onModalClick={this.openModal} />

        {gallery.length !== 0 && gallery.length >= 12 && (
          <Button onLoadMore={this.onLoadButtonClick} />
        )}
        {loading && <Loader />}
        {showModal && (
          <Modal onClose={this.closeModal} largeImage={largeImage} />
        )}
      </div>
    );
  }
}
