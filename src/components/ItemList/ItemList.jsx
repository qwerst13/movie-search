import React from 'react';
import PropTypes from 'prop-types';

import Item from './Item';

import './ItemList.scss';

function ItemList(props) {
  const { data } = props;

  const elements = data.map((item) => <Item key={item.id} data={item} />);

  return <div className="itemList">{elements}</div>;
}

ItemList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ItemList;
