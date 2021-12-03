import React from 'react';
import PropTypes from 'prop-types';

const Quote = ({ quote }) => {
  const styles = {
    maxWidth: "500px"
  }
  return (
    <blockquote style={styles}>
      <q>{quote.texto}</q>
      <p>- {quote.autor}</p>
    </blockquote>
  )
}

Quote.propTypes = {
  quote: PropTypes.shape({
    texto: PropTypes.string,
    autor: PropTypes.string
  }).isRequired
}

export default Quote;