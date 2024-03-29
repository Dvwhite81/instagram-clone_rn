import PropTypes from 'prop-types';

export const navigationType = PropTypes.shape({
  dispatch: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
  setParams: PropTypes.func.isRequired,
  state: PropTypes.shape({
    key: PropTypes.string.isRequired,
    routeName: PropTypes.string.isRequired,
    path: PropTypes.string,
    params: PropTypes.object,
  }).isRequired,
}).isRequired;

export const iconType = PropTypes.shape({
  icon: PropTypes.object,
  activeTab: PropTypes.object,
  setActiveTab: PropTypes.func,
});

export const iconsType = PropTypes.shape({
  icons: PropTypes.array,
});

export const postType = PropTypes.shape({
  caption: PropTypes.string,
  email: PropTypes.string,
  imageUrl: PropTypes.string,
  liked: PropTypes.array,
  pic: PropTypes.string,
});

export const footerType = PropTypes.shape({
  handleLike: PropTypes.func,
  post: postType,
});

export const postIconType = PropTypes.shape({
  imgStyle: PropTypes.string,
  imageUrl: PropTypes.string,
});
