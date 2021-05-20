import React from 'react';
import PropTypes from 'prop-types';

import './SearchBar.scss';
import { Input } from 'antd';


export default class SearchBar extends React.Component {
  static defaultProps = {
    onSearch: () => {}
  }

  static propTypes = {
    onSearch: PropTypes.func,
  }

  state = {
    value: ''
  }

  onChange = (event) => {
    const {value} = event.target;

    this.setState({value});
  }

  onSearch = () => {
    const {value} = this.state;
    const {onSearch} = this.props;

    onSearch(value);
  }

  render() {
    return <Input.Search
      className='searchBar'
      size="large"
      placeholder="Type to search..."
      onChange={this.onChange}
      onSearch={this.onSearch}
    />
  }
};

