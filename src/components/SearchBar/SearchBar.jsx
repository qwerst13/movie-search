import React from 'react';

import './SearchBar.scss';
import { Input, AutoComplete } from 'antd';

const renderItem = (title) => ({
  value: title,
  label: <div>{title}</div>,
});

const options = [renderItem('first'), renderItem('second'), renderItem('third')];

const SearchBar = () => (
  <AutoComplete
    dropdownClassName="certain-category-search-dropdown"
    style={{
      width: '100%',
      margin: '24px auto',
    }}
    options={options}
  >
    <Input.Search size="large" placeholder="Type to search..." />
  </AutoComplete>
);

export default SearchBar;
