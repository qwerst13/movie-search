import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'antd';

import Item from './Item';

import './ItemList.scss';

function ItemList(props) {
  const { data, genres } = props;

  const elements = (data.length > 0)
    ? data.map((item) => <Item key={item.id} data={item} genres={genres} />)
    : <Alert
      message="Nothing found"
      description="Try to search something less specific"
      type="info"
      showIcon
    />

  return <div className="itemList">{elements}</div>;
}

ItemList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  // eslint-disable-next-line react/require-default-props
  genres: PropTypes.instanceOf(Map)
};

export default ItemList;
