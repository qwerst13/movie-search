import React from 'react';
import PropTypes from 'prop-types';

import { Alert, Pagination, Row } from 'antd';

import './ItemList.scss';

import Item from './Item';

export default function ItemList(props) {
  const { data, pages, currentPage, searchPhrase, currentTab, onRated, onSearch } = props;

  const elements =
    data.length > 0 ? (
      data.map((item) => <Item key={item.id} data={item} />)
    ) : (
      <Alert message="Nothing found" description="Try to search something less specific" type="info" showIcon />
    );

  function onPaginationChange(page) {
    if (currentTab === 'Rated') onRated(page);
    if (currentTab === 'Search') onSearch(searchPhrase, page);
  }

  return (
    <Row justify="center" className="rowWrapper">
      <div className="itemList">{elements}</div>

      <Row justify="center" className="rowWrapper">
        <Pagination
          size="small"
          hideOnSinglePage
          current={currentPage}
          defaultPageSize={20}
          pageSizeOptions={[]}
          total={pages * 20}
          onChange={onPaginationChange}
        />
      </Row>
    </Row>
  );
}

ItemList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  onSearch: () => {},
  onRated: () => {},
  searchPhrase: '',
  currentPage: 1,
  pages: 1,
  currentTab: 'Search',
};

ItemList.defaultProps = {
  data: [],
  onSearch: PropTypes.func,
  onRated: PropTypes.func,
  searchPhrase: PropTypes.string,
  currentPage: PropTypes.number,
  pages: PropTypes.number,
  currentTab: PropTypes.string,
};
