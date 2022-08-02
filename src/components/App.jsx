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
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    // const prevSearchInput = prevState.seachKey;
    // const nextSearchInput = this.state.seachKey;
    // const prevPage = prevState.page;
    // const nextPage = this.state.page;
    const { searchKey, page } = this.state;

    fetchImages(searchKey, page).then(result =>
      this.setState({
        gallery: result,
      })
    );
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
        <ImageGallery gallery={gallery} />
        {this.state.status === 'resolved' && gallery.length >= 12 && (
          <Button onLoadMore={this.onLoadButtonClick} />
        )}
      </div>
    );
  }
}
