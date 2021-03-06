import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, css} from 'aphrodite';
import ImageRef from './ImageRef';

class ImageDefault extends React.Component {
  static propTypes = {
    src: PropTypes.string,
    missing_url: PropTypes.string.isRequired
  };
  state = {
    image_error: false,
    image_src: null
  };
  component_mounted = false;
  componentWillMount = () => {
    this.setState( {
      image_src: encodeURI("//via.placeholder.com/200x200?text=Loading...")
    });
  };
  componentDidMount = () => {
    this.component_mounted = true;
    this.createImage( this.props.src);
  };

  componentWillReceiveProps = newProps => {
    if( this.component_mounted && newProps.src && newProps.src !== this.props.src){
      this.createImage( newProps.src);
    }
  };
  componentWillUnmount = () => {
    this.component_mounted = false;
  };
  createImage = src => {
    ImageRef( src, "//via.placeholder.com/200x200?text=Not Found")
    .then( image_src => {
      // check component is mounted or we get warning can't setState on
      // unmounted component
      if( this.component_mounted) {
        this.setState( {image_src, image_error:false});
      }
    })
    .catch( () => {
      if (this.component_mounted) {
        this.setState( {image_src: encodeURI(`//via.placeholder.com/200x200?text=Not Found`)});
      }
    });
  };
  onImageError = () => {
    this.setState( {image_error: true, image_src: this.props.missing_url});
  };
  render = () => {
    const {missing_url} = this.props;
    const {image_error, image_src} = this.state;
    return (
      <div>
        { image_error
          ? <img className={css(styles.image)} src={encodeURI(missing_url)} alt="missing"/>
          : <img className={css(styles.image)}
              src={image_src}
              alt="noimage"
              onError={this.onImageError}
            />
        }
      </div>
    );
  };
}

const styles = StyleSheet.create({
  image: {
    borderRadius: '4px 4px 0 0',
    width: '100%',
    padding: '0'
  }
});

export default ImageDefault;
