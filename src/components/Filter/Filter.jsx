import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Row } from 'antd';

import './Filter.scss';

function Filter(props) {
  const { selected, onSearch, onRated, searchPhrase, currentPage } = props;
  const itemStyle = {
    margin: '0',
    padding: '0 20px',
  };

  function onTabSelect(event) {
    const { key: currentTab } = event;

    if (currentTab === 'Rated') onRated();
    if (currentTab === 'Search') onSearch(searchPhrase, currentPage);
  }

  return (
    <Row justify="center">
      <Menu onClick={onTabSelect} selectedKeys={selected} mode="horizontal" className="filter">
        <Menu.Item style={itemStyle} key="Search">
          Search
        </Menu.Item>
        <Menu.Item style={itemStyle} key="Rated">
          Rated
        </Menu.Item>
      </Menu>
    </Row>
  );
}

Filter.defaultProps = {
  selected: 'Search',
  onSearch: () => {},
  onRated: () => {},
  searchPhrase: '',
  currentPage: 1,
};

Filter.propTypes = {
  selected: PropTypes.string,
  onSearch: PropTypes.func,
  onRated: PropTypes.func,
  searchPhrase: PropTypes.string,
  currentPage: PropTypes.number,
};

export default Filter;
