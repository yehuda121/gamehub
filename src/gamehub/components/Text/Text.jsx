// Text.jsx
import React from 'react';
import PropTypes from 'prop-types';
import './Text.css';

const Text = ({ children, className }) => {
  return <p className={`text ${className}`}>{children}</p>;
};

Text.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Text.defaultProps = {
  className: '',
};

export default Text;
