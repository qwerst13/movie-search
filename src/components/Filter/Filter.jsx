import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'antd';

import './Filter.scss';

function Filter(props) {
  const { selected, onTabSelect } = props;
  const itemStyle = {
    margin: '0',
    padding: '0 20px',
  };

  return (
    <Menu onClick={onTabSelect} selectedKeys={selected} mode="horizontal" className="filter">
      <Menu.Item style={itemStyle} key="Search">
        Search
      </Menu.Item>
      <Menu.Item style={itemStyle} key="Rated">
        Rated
      </Menu.Item>
    </Menu>
  );
}

Filter.defaultProps = {
  selected: 'Search',
  onTabSelect: () => {},
};

Filter.propTypes = {
  selected: PropTypes.string,
  onTabSelect: PropTypes.func,
};

export default Filter;
