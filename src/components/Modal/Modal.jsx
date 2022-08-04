import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#root');

class Modal extends Component {
  static propTypes = {
    props: PropTypes.arrayOf(
      PropTypes.exact({
        largeImage: PropTypes.string.isRequired,
        alt: PropTypes.string.isRequired,
      })
    ),
  };

  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown = evt => {
    evt.preventDefault();
    if (evt.code === 'Escape') {
      this.props.onClose();
    }
  };

  onBackdropClick = evt => {
    evt.preventDefault();
    if (evt.currentTarget === evt.target) {
      this.props.onClose();
    }
  };

  render() {
    const { largeImage, alt } = this.props;

    return createPortal(
      <div className={css.overlay} onClick={this.onBackdropClick}>
        <div className={css.modal}>
          <img src={largeImage} alt={alt}></img>
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
