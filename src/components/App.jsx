import { Component } from 'react';
import PropTypes from 'prop-types';
import fetchImages from 'services/pixabay-api';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';

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
    seachKey: '',
    gallery: [],
    page: 1,
    largeImage: '',
    largeImageAlt: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchKey, page } = this.state;

    const prevSearchInput = prevState.seachKey;
    const nextSearchInput = searchKey;
    const prevPage = prevState.page;
    const nextPage = page;

    if (prevSearchInput !== nextSearchInput || prevPage !== nextPage) {
      fetchImages(searchKey, page).then(result => {
        if (nextPage === 1) {
          if (result.length === 0) {
            return 'No images found';
          } else {
            this.setState({ gallery: result });
            return;
          }
        }
        this.setState({ gallery: [...prevState.gallery, ...result] });
      });
    }
  }

  onFormSubmitHandler = ({ searchInput }) => {
    this.setState({ searchKey: searchInput, page: 1 });
  };

  onLoadButtonClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { gallery } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.onFormSubmitHandler} />
        <ImageGallery images={gallery} />
        {gallery.length !== 0 && gallery.length >= 12 && (
          <Button onLoadMore={this.onLoadButtonClick} />
        )}
      </div>
    );
  }
}
