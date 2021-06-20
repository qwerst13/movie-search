/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';

import { Alert, Pagination, Row } from 'antd';

import './ItemList.scss';

import Item from './Item';

export default function ItemList(props) {
  const { data, pages, onPaginationChange } = props;

  const elements =
    data.length > 0 ? (
      data.map((item) => <Item key={item.id} data={item} />)
    ) : (
      <Alert message="Nothing found" description="Try to search something less specific" type="info" showIcon />
    );

  return (
    <>
      <Row justify="center" className="rowWrapper">
        <div className="itemList">{elements}</div>
      </Row>
      <Row justify="center" className="rowWrapper">
        <Pagination
          size="small"
          hideOnSinglePage
          current={pages.current}
          defaultPageSize={20}
          pageSizeOptions={[]}
          total={pages.total * 20}
          onChange={onPaginationChange}
        />
      </Row>
    </>
  );
}

ItemList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};

ItemList.defaultProps = {
  data: [],
};
