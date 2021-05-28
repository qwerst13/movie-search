import React from 'react';
import PropTypes from 'prop-types';

import { Alert } from 'antd';

import './ItemList.scss';

import Item from './Item';

function ItemList(props) {
  const { data, genres } = props;

  const elements =
    data.length > 0 ? (
      data.map((item) => <Item key={item.id} data={item} genres={genres} />)
    ) : (
      <Alert message="Nothing found" description="Try to search something less specific" type="info" showIcon />
    );

  return <div className="itemList">{elements}</div>;
}

ItemList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  genres: PropTypes.instanceOf(Map),
};

ItemList.defaultProps = {
  data: [],
  genres: new Map(),
};

export default ItemList;
