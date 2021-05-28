import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { Input } from 'antd';

import './SearchBar.scss';

export default class SearchBar extends React.Component {
  static defaultProps = {
    onSearch: () => {},
  };

  static propTypes = {
    onSearch: PropTypes.func,
  };

  state = {
    value: '',
  };

  onChange = (event) => {
    const { value } = event.target;

    this.setState({ value });

    this.onSearch();
  };

  onSearch = () => {
    const { value } = this.state;
    const { onSearch } = this.props;

    onSearch(value);
  };

  render() {
    return (
      <Input
        className="searchBar"
        size="large"
        placeholder="Type to search..."
        onChange={_.debounce(this.onChange, 1000)}
      />
    );
  }
}
