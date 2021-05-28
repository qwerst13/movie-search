import React from 'react';
import { Menu } from 'antd';

import './Filter.scss';

class Filter extends React.Component {
  state = {
    current: 'Search',
  };

  handleClick = (event) => {
    this.setState({ current: event.key });
  };

  render() {
    const { current } = this.state;

    return (
      <Menu onClick={this.handleClick} selectedKeys={[current]} mode="horizontal" className="filter">
        <Menu.Item key="Search">Search</Menu.Item>
        <Menu.Item key="Rated">Rated</Menu.Item>
      </Menu>
    );
  }
}

export default Filter;
