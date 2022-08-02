import { Component } from 'react';
import PropTypes from 'prop-types';
import fetchImages from 'services/pixabay-api';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';

export class App extends Component {
  static propTypes = {
    state: PropTypes.arrayOf(
      PropTypes.exact({
        searchKey: PropTypes.string,
        gallery: PropTypes.array,
        page: PropTypes.number.isRequired,
        largeImage: PropTypes.string,
        largeImageAlt: PropTypes.string,
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
    const prevSearchInput = prevState.seachKey;
    const nextSearchInput = this.state.seachKey;
    const prevPage = prevState.page;
    const nextPage = this.state.page;
    const { page } = this.state;

    fetchImages(nextSearchInput, nextPage).then(result => {
      if (nextSearchInput !== prevSearchInput) {
        fetchImages(nextSearchInput, page).then(res =>
          this.setState({ gallery: res })
        );

        if (prevPage !== nextPage && nextPage !== 1) {
          fetchImages(nextSearchInput, nextPage).then(res => {
            this.setState(prevState => ({
              gallery: [...prevState.gallery, ...res],
            }));
          });
        }
      }
    });
  }

  onFormSubmitHandler = ({ searchInput }) => {
    this.setState({ searchKey: searchInput, page: 1 });
  };

  render() {
    const { gallery } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.onFormSubmitHandler} />
        <ImageGallery gallery={gallery} />
      </div>
    );
  }
}
