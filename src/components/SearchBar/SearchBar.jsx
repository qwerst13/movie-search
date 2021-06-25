import React, { useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { Input, Row } from 'antd';

import './SearchBar.scss';

export default function SearchBar({ onSearch }) {
  const [searchPhrase, setSearchPhrase] = useState('');

  function onChange(event) {
    const { value } = event.target;

    setSearchPhrase(value);
    if (searchPhrase !== value) onSearch(value);
  }

  return (
    <Row justify="center">
      <Input
        className="searchBar"
        size="large"
        placeholder="Type to search..."
        onChange={_.debounce(onChange, 1000)}
      />
    </Row>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func,
};

SearchBar.defaultProps = {
  onSearch: () => {},
};
