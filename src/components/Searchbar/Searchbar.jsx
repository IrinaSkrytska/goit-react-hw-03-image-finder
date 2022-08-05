import PropTypes from 'prop-types';
import { Component } from 'react';
import css from './Searchbar.module.css';

class Searchbar extends Component {
  static propTypes = {
    state: PropTypes.arrayOf(
      PropTypes.exact({ searchInput: PropTypes.string.isRequired })
    ),
  };

  state = {
    searchInput: '',
  };

  handleSearch = evt => {
    this.setState({ searchInput: evt.currentTarget.value.toLowerCase() });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const { onSubmit } = this.props;

    if (this.state.searchInput.trim() === '') {
      return 'Please enter the field ';
    }

    onSubmit(this.state);
    this.onFormReset();
  };

  onFormReset = () => {
    this.setState({ searchInput: '' });
  };

  render() {
    const { searchInput } = this.state;

    return (
      <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={this.handleSubmit}>
          <button className={css.searchForm_button} type="submit">
            <span className={css.searchForm_button_label}>Search</span>
          </button>

          <input
            className={css.searchForm_input}
            type="text"
            name="search"
            value={searchInput}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleSearch}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
